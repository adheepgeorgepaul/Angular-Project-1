import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

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
    user = new BehaviorSubject<User>(null);   


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
                    .pipe(catchError(this.handleError),
                        tap(respData => this.handleAuthentication(respData))
                    );
                
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
                    .pipe(catchError(this.handleError),
                        tap(respData => this.handleAuthentication(respData))
                    );
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

    private handleAuthentication(respData: AuthResponseData)
    {
        const expirationDate = new Date( 
            new Date().getTime() + +respData.expiresIn * 1000
            );     
        const user = new User(
            respData.email,
            respData.localId,
            respData.idToken,
            expirationDate
        ); 
        
        this.user.next(user);
    }
}