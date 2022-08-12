import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import {Expense} from '../expense'
import { Observable, of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

// export interface ExpenseItems {
//   title? : any;
//   price? : any;

// }
// const ELEMENT_DATA: ExpenseItems[]=[
//   {title ,price}
// ]

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})

export class ExpenseListComponent implements OnInit  {

  expense: Expense[]=[];
  tableheaders: string[] = ['title','price','category','description', 'purchaseDate']
  // expenses$?: Observable<Expense[]>;
  // title? : any;
  // price? : any;
  //
  // dataSource?: MatTableDataSource<Expense>;

  constructor(
    private expenseService: ExpenseService
  ) { }

  ngOnInit(): void {
    this.expenseService.getAllexpense().subscribe(data => {
      this.expense=data.expense;
      console.log(this.expense)
    //   for(var i of data.expense){
    //  // console.log(i.title)
    //   // this.title = i.title;
    //   // this.price = i.price
    // //  console.log(this.expense.expense[0].title);
    //   // console.log(this.title)
    //   // console.log(this.price)
    //   }
    })
  }


  //
  // dataSource = this.expense;
}
