import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ShortenerComponent } from './shortener/shortener.component';
import { ShortenerDetailsComponent} from './shortener-details/shortener-details.component'



const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'shortener', component: ShortenerComponent },
  {path: 'shortener/:id', component: ShortenerDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
