import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { FincaService } from 'app/entities/fincasMs/finca/finca.service';
import { HttpResponse } from '@angular/common/http';
import { IFinca } from 'app/shared/model/fincasMs/finca.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;

  fincas: IFinca[] | null = [];

  constructor(private accountService: AccountService, private loginModalService: LoginModalService, private fincaService: FincaService) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      if (this.account) {
        this.loadCurrentUserFincas();
      }
    });
    if (this.account) {
      this.loadCurrentUserFincas();
    }
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  loadCurrentUserFincas(): void {
    this.fincaService.getCurrentUserFincas().subscribe((res: HttpResponse<IFinca[]>) => {
      this.fincas = res.body;
    });
  }
}
