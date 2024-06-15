import { Observable } from 'rxjs';

export interface UseCase<T = unknown, D = unknown> {
  exec(data: D): Observable<T | null> | Promise<T | null> | T | null;
}
