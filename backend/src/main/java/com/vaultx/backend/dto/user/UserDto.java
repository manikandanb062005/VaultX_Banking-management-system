package com.vaultx.backend.dto.user;

import com.vaultx.backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String role;
    private String status;
    private LocalDate joinDate;
    private Integer accounts;

    public static UserDto fromEntity(User user) {
        return UserDto.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole().name())
                .status(user.getStatus().name().toLowerCase())
                .joinDate(user.getJoinDate())
                .accounts(user.getAccounts() == null ? 0 : user.getAccounts().size())
                .build();
    }
}
