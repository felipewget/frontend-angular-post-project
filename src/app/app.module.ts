import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutesModule } 	from './app.routes.module';
import { AppComponent } 	from './app.component';
import { LoginComponent }   from './screens/login/login.component';
import { FormLoginComponent }   from './components/form-login/form-login.component';

import { RegisterComponent }   from './screens/register/register.component';
import { FormRegisterComponent }   from './components/form-register/form-register.component';

import { FeedComponent }   from './screens/feed/feed.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FormLoginComponent,
    FormRegisterComponent,
    FeedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [
    Title,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
