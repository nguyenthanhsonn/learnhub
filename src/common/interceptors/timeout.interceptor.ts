import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { timeout } from "rxjs";

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(timeout(5000));
  }
}