import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { timer } from 'rxjs';

declare var jQuery: any;

import { EosService } from '../../services/eos.service';
import { User } from '../../models/user';

@Component({
  selector: 'vs-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User;
  username = 'YouTuber';
  notificationCount = 0;
  private usernameSubscription: Subscription;
  private roleIdSubscription: Subscription;
  private taskCountByRoleSubscription: Subscription;
  private taskTimer = timer(0, 5000);

  constructor(private router: Router, private eosService: EosService) {}

  ngOnInit() {
    this.usernameSubscription = this.eosService.navItemUsername$.subscribe((username: string) => {
      this.username = username;
      if (username) {
        this.populateNav();
      }
    });
    this.mainMenu();
    this.populateNav();
  }

  ngOnDestroy() {
    if (this.usernameSubscription) {
      this.usernameSubscription.unsubscribe();
    }
  }

  // Main Menu Superfish
  private mainMenu() {
    jQuery('#videosmart-primary-menu').superfish({
      delay: 0,
      animation: {
        opacity: 'show'
      },
      speed: 'fast',
      cssArrows: true,
      disableHI: true
    });
  }

  populateNav() {
    this.eosService.isUserSessionValid().subscribe(
      (data: any) => {
        console.log(data);
      },
      (err: any) => {
        console.log(err);
        this.router.navigate(['/home']);
      }
    );
  }

  logout() {
    this.user = null;
    this.eosService.setUser(null);
    this.notificationCount = 0;
    this.eosService.pushNavUsername(null);
    if (this.roleIdSubscription) {
      this.roleIdSubscription.unsubscribe();
    }
    if (this.taskCountByRoleSubscription) {
      this.taskCountByRoleSubscription.unsubscribe();
      this.taskCountByRoleSubscription = null;
    }
    this.eosService.logout().subscribe(data => {
      console.log('logged out');
    });
    this.router.navigate(['/home']);
  }
}
