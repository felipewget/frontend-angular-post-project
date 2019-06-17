import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutesModule } 	from './app.routes.module';
import { AppComponent } 	from './app.component';
import { LoginComponent }   from './screens/login/login.component';
import { FormLoginComponent }   from './components/form-login/form-login.component';

import { RegisterComponent }   from './screens/register/register.component';
import { FormRegisterComponent }   from './components/form-register/form-register.component';

import { EditPostComponent }   from './components/edit-post/edit-post.component';

import { FeedComponent }   from './screens/feed/feed.component';

import { HeaderComponent }            from './components/header/header.component';
import { PostComponent }              from './components/post/post.component';
import { PanelCreatePostComponent }   from './components/panel-create-post/panel-create-post.component';

import { LoadingPageComponent }       from './components/loading-page/loading-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FormLoginComponent,
    FormRegisterComponent,
    FeedComponent,
    HeaderComponent,
    PostComponent,
    PanelCreatePostComponent,
    LoadingPageComponent,
    EditPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [
    Title,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
