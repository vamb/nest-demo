import { Injectable, NestInterceptor, ExecutionContext, CallHandler,
 BadGatewayException } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    return next.handle()
      .pipe(catchError(err => throwError(() => new BadGatewayException())))
  }
}
