package com.storyart.apigateway.security;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.netflix.zuul.filters.support.FilterConstants;

import java.util.Enumeration;

public class PreFilter  extends ZuulFilter {

    @Override
    public String filterType() {
        return "pre";
    }

    @Override
    public int filterOrder() {
        return  FilterConstants.SEND_RESPONSE_FILTER_ORDER;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }
    Logger log = LoggerFactory.getLogger(PreFilter.class);

    @Override
    public Object run() throws ZuulException {
        RequestContext ctx = RequestContext.getCurrentContext();
        StringBuffer strLog = new StringBuffer();
        strLog.append("\n------ API_GATE_WAY pre filter ------\n");
        ctx.getRequest().getHeader("Authorization");
        strLog.append(String.format("Server: %s : %s Path: %s \n", ctx.getRequest().getServerName(), ctx.getRequest().getMethod(),
                ctx.getRequest().getRequestURI()));
        Enumeration< String > enume = ctx.getRequest().getHeaderNames();
        String header;
        while (enume.hasMoreElements()) {
            header = enume.nextElement();
            strLog.append(String.format("Headers: %s = %s \n", header, ctx.getRequest().getHeader(header)));
        };
        log.info(strLog.toString());
        return null;
    }
}
