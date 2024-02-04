package com.ks.jwtfullstack.models;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class JWTResponse {

    private String jwtToken;
    private String username;
}
