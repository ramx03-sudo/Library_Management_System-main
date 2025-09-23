package com.lms.LibraryManagementSystem.utility;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class LoggingAspect {

    public static final Log LOGGER = LogFactory.getLog(LoggingAspect.class);



    public void logException(Exception ex){
        LOGGER.error(ex);
    }
}
