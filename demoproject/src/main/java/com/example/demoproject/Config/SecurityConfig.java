package com.example.demoproject.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/user", "/login").permitAll()  // Public endpoints
                        .requestMatchers("/users").authenticated()       // Private endpoint
                )
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(authenticationSuccessHandler()) // Redirect after login
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt() // Let Okta handle JWT configuration
                );

        return http.build();
    }

    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler() {
        return (request, response, authentication) -> {
            // Get the authenticated user details (OAuth2User)
            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();

            // Get the 'given_name' from the OAuth2User attributes
            String givenName = oauth2User.getAttribute("given_name");  // Assuming the given_name is part of the attributes

            // Construct the redirect URL with the 'given_name'
            String redirectUrl = "http://localhost:5173/home/" + givenName;

            // Redirect to the URL
            response.sendRedirect(redirectUrl);
        };
    }


    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        config.setAllowCredentials(true);
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
