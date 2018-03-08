import { Response } from '@angular/http';
import 'rxjs/add/observable/throw';
/**
 * Default error handler
 */
export declare class ErrorHandler {
    handleError(error: Response): any;
}
