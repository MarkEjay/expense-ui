import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BASEURL } from '../constants';
import { Expense} from './expense';
//import { GenericHttpService} from '../generic-http.service';
@Injectable({
  providedIn: 'root'
})
export class ExpenseService  {

  constructor(public http: HttpClient) {

   }

   addExpense(expense: Expense): Observable<any> {
     return this.http.post(`${BASEURL}/expense/add-expense`, expense)
   }

   getAllexpense():Observable<any>{
     return this.http.get(`${BASEURL}/expense`)
   }
}
