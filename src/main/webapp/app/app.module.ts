import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { WebGatewaySharedModule } from 'app/shared/shared.module';
import { WebGatewayCoreModule } from 'app/core/core.module';
import { WebGatewayAppRoutingModule } from './app-routing.module';
import { WebGatewayHomeModule } from './home/home.module';
import { WebGatewayEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    WebGatewaySharedModule,
    WebGatewayCoreModule,
    WebGatewayHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    WebGatewayEntityModule,
    WebGatewayAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class WebGatewayAppModule {}
