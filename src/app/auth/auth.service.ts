import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { environment } from '../../environments/environment';

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
{   
    constructor(
    private http: HttpClient,
    private router: Router
    ){}

    user = new BehaviorSubject<User>(null);   

    private tokenExpirationTimer: any;


    signup(email: string, password: string)
    {   
        return  this.http
                    .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
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
                    .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
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
        this.autologout(+respData.expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }
    
    autologin()
    {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        
        if(!userData)
        {
            return;
        }
        
        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate) 
        );

        if(loadedUser.token)
            {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autologout(expirationDuration);
        } 
    }


    logout()
    {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer)
        {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autologout(expirationDuration: number)
    {
        console.log(expirationDuration);
        this.tokenExpirationTimer = setTimeout(() => {
                                            this.logout();
                                        }, expirationDuration);
    }
}