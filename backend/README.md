# VaultX Backend (Spring Boot + MySQL)

Backend for the VaultX banking frontend. Provides JWT-secured REST APIs for auth, accounts,
transactions, and admin operations (users, accounts, transactions, loans).

## Stack
- Java 17
- Spring Boot 3.3 (Web, Security, Data JPA, Validation)
- MySQL 8
- JWT auth (jjwt)

## 1. Create the database

You don't need to create tables manually — Hibernate (`ddl-auto=update`) creates/updates the
schema automatically. You only need the MySQL server running and a database user with access.

```sql
CREATE DATABASE IF NOT EXISTS vaultx_db;
```

## 2. Configure

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/vaultx_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
app.jwt.secret=change-this-to-a-long-random-string
app.cors.allowed-origins=http://localhost:5173
```

For production, move `spring.datasource.username/password` and `app.jwt.secret` into
environment variables instead of committing them.

## 3. Run

```bash
mvn spring-boot:run
```

The API starts on `http://localhost:8080`. On first run, `DataSeeder` populates demo data
matching the frontend's old mock data, including two login accounts:

| Role  | Email             | Password |
|-------|-------------------|----------|
| Admin | admin@vaultx.com  | admin123 |
| User  | mani@vaultx.com   | user123  |

Delete `DataSeeder.java` (or guard it further) once you have real users — it only seeds when
the `users` table is empty.

## 4. API overview

| Method | Path                              | Auth        | Description               |
|--------|------------------------------------|-------------|----------------------------|
| POST   | /api/auth/login                   | public      | Login, returns JWT + user |
| POST   | /api/auth/register                | public      | Register new user + account |
| GET    | /api/accounts/my                  | user        | List my accounts          |
| POST   | /api/accounts/{id}/deposit        | user        | Deposit into an account    |
| POST   | /api/accounts/{id}/withdraw       | user        | Withdraw from an account   |
| GET    | /api/transactions/my              | user        | My transaction history    |
| POST   | /api/transactions/transfer        | user        | Transfer between accounts |
| GET    | /api/admin/users                  | admin       | List all users            |
| PUT    | /api/admin/users/{id}/toggle-status | admin     | Activate/deactivate a user |
| GET    | /api/admin/accounts               | admin       | List all accounts          |
| GET    | /api/admin/transactions           | admin       | List all transactions      |
| GET    | /api/admin/loans                  | admin       | List all loan applications |
| PUT    | /api/admin/loans/{id}/approve     | admin       | Approve a loan             |
| PUT    | /api/admin/loans/{id}/reject      | admin       | Reject a loan              |

Authenticated requests need `Authorization: Bearer <token>`.

## 5. Connecting the frontend

The frontend already reads `VITE_API_URL` from its `.env` (defaults to
`http://localhost:8080/api`), and its `src/services/*.js` files have been updated to call
these real endpoints instead of the previous mocked data. Just run both apps side by side:

```bash
# terminal 1
cd vaultx-backend && mvn spring-boot:run

# terminal 2
cd banking-frontend && npm install && npm run dev
```

## Notes / next steps
- Passwords are BCrypt-hashed; JWTs are HMAC-SHA256, 24h expiry (`app.jwt.expiration-ms`).
- `/api/admin/**` requires role `ADMIN`; everything else under `/api/**` (besides `/api/auth/**`)
  requires a valid JWT.
- Money fields use `BigDecimal` end-to-end to avoid floating point rounding issues.
- Transfers are done atomically inside a single `@Transactional` service method.
