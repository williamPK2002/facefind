import { Catch, ArgumentsHost, HttpStatus, HttpException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Request, Response } from "express";
import { MyLoggerService } from "./my-logger/my-logger.service";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

type MyResponseObject = {
    statusCode: number,
    timestamp: string,
    path: string,
    response : string | object,
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly logger = new MyLoggerService(AllExceptionsFilter.name); // Initialize custom logger with context
    
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const myResponseObject: MyResponseObject = {
            statusCode: 500, // Default to 500, will be updated below
            timestamp: new Date().toISOString(),
            path: request.url,
            response: '',
        }
        
        if (exception instanceof HttpException) {
            myResponseObject.statusCode = exception.getStatus();
            myResponseObject.response = exception.getResponse();
        } else if (exception instanceof PrismaClientValidationError) {
            myResponseObject.statusCode = 422;
            myResponseObject.response = exception.message.replaceAll('\n', ' ');
        }
        else {
            myResponseObject.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            myResponseObject.response = 'Internal server error';
        }

        response
            .status(myResponseObject.statusCode)
            .json(myResponseObject);

        this.logger.error(JSON.stringify(myResponseObject), 
        AllExceptionsFilter.name);
        super.catch(exception, host); //optional: call the base class implementation
    }
}