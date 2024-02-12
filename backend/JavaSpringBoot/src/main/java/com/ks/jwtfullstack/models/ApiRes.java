package com.ks.jwtfullstack.models;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApiRes<T> {
    private String message;
    private boolean success;
    private T data;
}
