import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from "@nestjs/common";
import { Observable, throwError, TimeoutError } from "rxjs";
import { catchError, timeout } from "rxjs";

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      timeout(5000),
      catchError(err => {
        if (err instanceof TimeoutError){
          return throwError(()=> new TimeoutError())
        }
        return throwError(()=> err)
      })
    )
  }
}
