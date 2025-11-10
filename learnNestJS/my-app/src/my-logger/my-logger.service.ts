import { Injectable, ConsoleLogger } from '@nestjs/common';
import * as fs from 'fs';

// Custom logger service that extends NestJS ConsoleLogger
// It logs messages to both console and a file
// if the service is used this where the function to document/log or error is called

@Injectable()
export class MyLoggerService extends ConsoleLogger {

    logToFile(message: string) {
        const logEntry = `[${new Date().toISOString()}] ${message}\n`;
        fs.appendFile('app.log', logEntry, (err) => {
            if (err) console.error('Failed to write to log file:', err);
        });
    }

    log(message: string, context?: string) {
        const entry =  context + '\t' + message;
        this.logToFile(entry);
        super.log(entry);
    }

    error(message: string, stackOrContext?: string) {
        const entry =  stackOrContext + '\t' + message;
        this.logToFile(entry);
        super.error(entry);
    }
}
