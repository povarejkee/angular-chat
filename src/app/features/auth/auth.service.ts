import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, switchMap } from 'rxjs';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from '@angular/fire/auth';

import { ISignupCredentials } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authState = new BehaviorSubject<Object | null>(null);

  readonly isLoggedIn$ = authState(this.fbAuth);

  constructor(private fbAuth: Auth) {}

  signIn(credentials: Object) {
    this.authState.next(credentials);
  }

  signUp(user: ISignupCredentials): Observable<void> {
    const userCredential: Promise<UserCredential> =
      createUserWithEmailAndPassword(this.fbAuth, user.email, user.password);

    return from(userCredential).pipe(
      switchMap((credential: UserCredential) =>
        updateProfile(credential.user, { displayName: user.displayName })
      )
    );
  }
}
