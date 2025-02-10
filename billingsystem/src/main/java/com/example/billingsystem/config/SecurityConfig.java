package com.example.billingsystem.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.example.billingsystem.jwt.AuthEntryPoint;
import com.example.billingsystem.jwt.AuthTokenFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private AuthEntryPoint unauthorizedHandler;




    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter(){
        return new AuthTokenFilter();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(cors->{})
                .csrf((csrf)->csrf.disable())
                .authorizeHttpRequests((requests)->{
                 requests.requestMatchers("/","/auth/registration").permitAll()
                         .requestMatchers("/auth/login").permitAll()
                         .anyRequest().authenticated();// ee line em cheptundhi ante inkemi request ayina vaste daniki authentication kavali

                });
        http.sessionManagement((session)->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));


        http.exceptionHandling((exception)-> exception.authenticationEntryPoint(unauthorizedHandler));

        http.headers((headers)-> headers.frameOptions((frameOptionsConfig)->frameOptionsConfig.sameOrigin()));
//
//        http.formLogin(Customizer.withDefaults());
//        http.httpBasic(Customizer.withDefaults());



        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder(){

            return new BCryptPasswordEncoder();

    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception {
        return builder.getAuthenticationManager();
    }

    @Bean
    public CorsFilter corsFilter(){
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        // corsConfiguration.addAllowedOriginPattern("*");
        // corsConfiguration.addAllowedOrigin("http://localhost");
//        corsConfiguration.addAllowedOrigin("http://localhost:4200");
        corsConfiguration.addAllowedOrigin("http://ec2-3-111-39-151.ap-south-1.compute.amazonaws.com");
        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.addAllowedMethod("*");

        corsConfiguration.setAllowCredentials(true); //allow cookies and credentials

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**",corsConfiguration);

        return new CorsFilter(source);
    }

}
