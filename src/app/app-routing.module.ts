import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  AuthGuard,
  redirectLoggedInTo,
  canActivate,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

import { SigninComponent } from './features/auth/signin/signin.component';
import { SignupComponent } from './features/auth/signup/signup.component';

const loggedInGuard = canActivate(() => redirectLoggedInTo('chat'));

const routes: Routes = [
  {
    path: '',
    redirectTo: 'chat',
    pathMatch: 'full',
  },

  {
    path: 'signin',
    component: SigninComponent,
    // canActivate: [AuthGuard],
    // data: { authGuardPipe: () => redirectLoggedInTo('chat') },
    // simplify:
    ...loggedInGuard,
  },

  {
    path: 'signup',
    component: SignupComponent,
    ...loggedInGuard,
  },

  {
    path: 'chat',
    ...canActivate(() => redirectUnauthorizedTo('signin')),
    loadChildren: () =>
      import('./features/chat/chat.module').then((m) => m.ChatModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
