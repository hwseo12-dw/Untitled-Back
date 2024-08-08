package PTR.PTR.config;

import PTR.PTR.exception.MyAccessDeniedHandler;
import PTR.PTR.exception.MyAuthenticationEntryPoint;
import PTR.PTR.service.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    @Autowired
    private UserDetailService userDetailService;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeRequests(auth -> auth
                        .requestMatchers(
                                new AntPathRequestMatcher("/user/login"), // user/* => user의 자식만 || user/** => user의 자식의 자식까지 모두
                                new AntPathRequestMatcher("/user/signup"),
                                new AntPathRequestMatcher("/signup"),
                                new AntPathRequestMatcher("/ptr/**"),
                                new AntPathRequestMatcher("/css/**"),
                                new AntPathRequestMatcher("/js/**"),
                                new AntPathRequestMatcher("/**")
                        ).permitAll()
                        .anyRequest().authenticated()) // 모든 요청에 인증을 받음
                 // formLogin : 정적 로그인 페이지가 존재하는 경우 사용 , defaultSuccessUrl : 로그인 성공시 /articles로  로그인 페이지를 직접 만들기 위함
                .sessionManagement(session -> session // session 관리 시 필요
                        .sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
                .csrf(AbstractHttpConfigurer::disable) // 더 좋은 보안을 사용할 거라 csrf(다른 사이트의 접속을 차단함/피싱을 막기 위함)를 안 씀
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(new MyAuthenticationEntryPoint()) // 인증 실패
                        .accessDeniedHandler(new MyAccessDeniedHandler())) // 권한 실패
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, BCryptPasswordEncoder bCryptPasswordEncoder, UserDetailService userDetailService) throws Exception {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailService);
        authProvider.setPasswordEncoder(bCryptPasswordEncoder);
        return new ProviderManager(authProvider);
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
