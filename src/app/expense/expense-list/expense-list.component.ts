import { Component, OnInit,ViewChild } from '@angular/core';
import { ExpenseService } from '../expense.service';
import {Expense} from '../expense'
import { Observable, of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort, SortDirection,Sort} from '@angular/material/sort';
import { ExpenseCreateComponent } from '../expense-create/expense-create.component';
import {MatDialog} from '@angular/material/dialog';


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
  position: number = 0;
  tableheaders: string[] = ['title','price','category','description', 'purchaseDate','action' ]
  // expenses$?: Observable<Expense[]>;
  dataSource! : MatTableDataSource<any>
  // title? : any;
  // price? : any;
  //
  // dataSource?: MatTableDataSource<Expense>;

  constructor(
    private expenseService: ExpenseService,
    public dialog: MatDialog
  ) { }
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getExpense();

  }

  getExpense(){
    this.expenseService.getAllexpense().subscribe(data => {
      this.expense=data.expense;
      this.dataSource= new MatTableDataSource(this.expense)
      this.dataSource.sort = this.sort;


    })
  }

  editExpense(element:any){
    this.dialog.open(ExpenseCreateComponent,{
      data: element
    }).afterClosed().subscribe(result =>{
      this.getExpense()
    })
}

deleteExpense(id: string){
  this.expenseService.deleteExpense(id).subscribe(response=>{
    this.getExpense()
    console.log('deleted')
  })
}
}
