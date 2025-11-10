import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLoggerService } from './my-logger/my-logger.service';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    //bufferLogs: true, //this buffers logs until a logger is attached
  });
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  //app.useLogger(app.get(MyLoggerService)); //use custom logger service
  //app.enableCors();
  //this enables CORS for all origins. In a production app, you might want to restrict this.
  app.setGlobalPrefix('api');
  //this sets a global prefix for all routes in the app, 
  // so instead of /tasks, it will be /api/tasks
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

//The “bootstrap” script. It creates a Nest application instance and starts listening on a port:
