import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { UserProfile, Authorization } from '../core/services';
import { EchoesState } from '../core/store';
import { getUserPlaylists$, getUserViewPlaylist$ } from '../core/store/user-profile';

import './user.scss';

@Component({
  selector: 'user',
  template: `
  <article>
    <app-navbar>
      <h3 class="navbar-text">
        <i class="fa fa-heart"></i> My Profile - <small>My Playlists</small>
      </h3>
      <section>
        <ul class="nav nav-tabs" role="tablist">
          <li [class.active]="!(currentPlaylist$ | async)"><a href="#/user">My Playlists</a></li>
          <li class="active"
            *ngIf="currentPlaylist$ | async">
            <a>Playlist View</a>
          </li>
        </ul>
      </section>
    </app-navbar>
    <p *ngIf="!isSignIn()" class="well lead">
      To view your playlists in youtube, you need to sign in.
      <button class="btn btn-lg btn-primary"
        (click)="signInUser()">
        <i class="fa fa-google"></i> Sign In
      </button>
    </p>
    <router-outlet></router-outlet>
  </article>
  `
})
export class User implements OnInit {
  playlists$ = this.store.let(getUserPlaylists$);
  currentPlaylist$ = this.store.let(getUserViewPlaylist$);

  constructor(
    private userProfile: UserProfile,
    private authorization: Authorization,
    public store: Store<EchoesState>
  ) {}

  ngOnInit () {}

  signInUser () {
    this.authorization.signIn();
  }

  isSignIn () {
    return this.authorization.isSignIn();
  }

  getPlaylists () {
    return this.userProfile.getPlaylists(true);
  }
}
