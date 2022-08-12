import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseListComponent} from './expense/expense-list/expense-list.component'
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component'
import { AnalyticsComponent } from './analytics/analytics.component';



const routes : Routes = [


  {path:'expenses', component: ExpenseListComponent},
  {path:'analytics', component: AnalyticsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
