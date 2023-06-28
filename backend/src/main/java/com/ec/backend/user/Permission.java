package com.ec.backend.user;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {
    ADMIN_POST("admin:post");

    @Getter
    private final String permission;
}
