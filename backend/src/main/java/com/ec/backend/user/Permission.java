package com.ec.backend.user;

import lombok.Data;
import lombok.Getter;

public enum Permission {
    ADMIN_POST("admin:post");

    private final String permission;

    Permission(String permission) {
        this.permission = permission;
    }

    public String getPermission(){
        return permission;
    }
}
