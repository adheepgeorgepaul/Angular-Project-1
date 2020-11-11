import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface AuthResponseData
{
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}


@Injectable({ providedIn: 'root'})
export class AuthService
{   constructor(private http: HttpClient){}
    


    signup(email: string, password: string)
    {   
        return  this.http
                    .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCsPo8BHZWeZSm6AWMcqFa2zB1r_QgFRKg',
                            {
                                email: email,
                                password: password,
                                returnSecureToken: true
                            }
                    )
                    .pipe(catchError(this.handleError));
                
    }
    
    login(email: string, password: string)
    {
        return  this.http
                    .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCsPo8BHZWeZSm6AWMcqFa2zB1r_QgFRKg',
                        {
                            email: email,
                            password: password,
                            returnSecureToken: true
                        }
                    )
                    .pipe(catchError(this.handleError));
    }


    private handleError(errorRes: HttpErrorResponse)
    {
        let errorMessage = 'An unknown error has occured';
        if(!errorRes.error || !errorRes.error.error)
        {
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message)
        {
            case 'EMAIL_NOT_FOUND':
                    errorMessage = "This email doesn't exist!";
                    break;
            case 'INVALID_PASSWORD':
                    errorMessage = 'Invalid password!';
                    break;
            case 'USER_DISABLED':
                    errorMessage = 'Your account has been disabled.';
                    break;
            case 'EMAIL_EXISTS':
                    errorMessage = 'Your account has been disabled.';
                    break;
        }
        return throwError(errorMessage);
    }
}