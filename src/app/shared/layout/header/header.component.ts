import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {UserInfoType} from "../../../../types/user-info.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserInfoService} from "../../services/user-info.service";
import {Subscription} from "rxjs";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLogged: boolean = false;
  userInfo: UserInfoType | null = null;

  private subscriptions: Subscription = new Subscription();

  constructor(private authService: AuthService,
              private _snackBar: MatSnackBar,
              private userInfoService: UserInfoService,
              private router: Router) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit(): void {
    this.subscriptions.add(this.authService.isLogged$.subscribe((isLogged: boolean) => {
        this.isLogged = isLogged;

        if (isLogged) {
          this.loadUserInfo();
        } else {
          this.userInfo = null;
        }
      })
    );
  }

  private loadUserInfo() {
    this.subscriptions.add(this.userInfoService.getUserInfo()
      .subscribe({
        next: (data: UserInfoType | DefaultResponseType) => {
          let error = null;
          if ((data as DefaultResponseType).error !== undefined) {
            error = (data as DefaultResponseType).message;
          }
          const userInfo: UserInfoType = data as UserInfoType;
          if (!userInfo.id || !userInfo.name || !userInfo.email) {
            error = 'Ошибка, нет необходимых полей в объекте userInfo';
          }
          if (error) {
            this._snackBar.open(error);
            throw new Error(error);
          }
          this.userInfo = userInfo;

        },
        error: (err: HttpErrorResponse) => {
          if (err.error && err.error.message) {
            this._snackBar.open(err.error.message);
            console.log(err.error.message);
          } else {
            this._snackBar.open('Ошибка в получении объекта');
            console.log('Ошибка в получении объекта');
          }
        }
      })
    );
  }

  logout(): void {
    this.subscriptions.add(this.authService.logout()
      .subscribe({
        next: () => {
          this.doLogout();

        },
        error: () => {
          this.doLogout();
        }
      })
    );
  }

  doLogout(): void {
    this.authService.removeTokens();
    this.userInfo = null;
    this._snackBar.open('Вы успешно вышли из системы');
    this.router.navigate(['/']);

    if (this.router.url !== '/') {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}


