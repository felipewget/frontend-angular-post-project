import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } 	from './app.component';
import { LoginComponent }   from './screens/login/login.component';
import { RegisterComponent }   from './screens/register/register.component';
import { FeedComponent }   from './screens/feed/feed.component';

const routes: Routes = [
	{ path: 'register'	, component: RegisterComponent },
	{ path: 'feed'		, component: FeedComponent },
	{ path: 'login'		, component: LoginComponent },
	{ path: ''			, component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutesModule { }
