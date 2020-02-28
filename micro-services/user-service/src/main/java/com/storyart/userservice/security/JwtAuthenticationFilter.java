package com.storyart.userservice.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;


    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    private String getJwtTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");


        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;

    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = getJwtTokenFromRequest(request);

            if (StringUtils.hasText(jwt) && jwtTokenProvider.validateToken(jwt)) {

                //decode token and take userid from it
                Integer uid = jwtTokenProvider.getUserIdFromToken(jwt);


                UserDetails userDetails = userDetailsService.loadUserById(uid);

                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails,
                                null,
                                userDetails.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource()
                        .buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            }
        } catch (Exception e) {
            logger.error("Could not set user authentication in security context", e);
        }
        filterChain.doFilter(request, response);
    }
}
