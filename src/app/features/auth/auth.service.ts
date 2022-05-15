import { Injectable } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
  User,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';

import { ISigninCredentials, ISignupCredentials } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn$: Observable<User | null> = authState(this.fbAuth);

  constructor(private fbAuth: Auth) {}

  public signIn(user: ISigninCredentials): Observable<UserCredential> {
    return from(
      signInWithEmailAndPassword(this.fbAuth, user.email, user.password)
    );
  }

  public signUp(user: ISignupCredentials): Observable<void> {
    const userCredential: Promise<UserCredential> =
      createUserWithEmailAndPassword(this.fbAuth, user.email, user.password);

    return from(userCredential).pipe(
      switchMap((credential: UserCredential) =>
        updateProfile(credential.user, { displayName: user.displayName })
      )
    );
  }

  public signOut(): Observable<void> {
    return from(this.fbAuth.signOut());
  }
}
