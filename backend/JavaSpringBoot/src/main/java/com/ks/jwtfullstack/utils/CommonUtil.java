
package com.ks.jwtfullstack.utils;

import org.springframework.stereotype.Component;

import java.util.regex.Pattern;

@Component
public class CommonUtil {
    public static boolean patternMatches(String textVal, String regexPattern) {
        return Pattern.compile(regexPattern)
                .matcher(textVal)
                .matches();
    }

}
