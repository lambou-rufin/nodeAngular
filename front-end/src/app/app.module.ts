import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, PB_DIRECTION } from 'ngx-ui-loader';
import { SharedModule } from './shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorInterceptor } from './services/token-interceptor.interceptor';

const NgxUiLoaderConfig: NgxUiLoaderConfig = {
  text: "Loading....",
  textColor: "#ffffff",
  textPosition: "center-center",
  pbColor: "red",
  bgsColor: "red",
  fgsColor: "red",
  fgsType: SPINNER.ballSpinClockwise,
  fgsSize: 100,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5
}


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    NgxUiLoaderModule.forRoot(NgxUiLoaderConfig)
  ],
  providers: [HttpClientModule,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
