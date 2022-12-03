import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ExpenseCreateComponent} from './expense/expense-create/expense-create.component'
import { ExpenseService } from './expense/expense.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public dialog: MatDialog, private expenseService: ExpenseService){}

  openDialog(){
    const dialogRef = this.dialog.open(ExpenseCreateComponent);

    dialogRef.afterClosed().subscribe(result =>{

        console.log("this is update")


      console.log('Dialog closed')
    })
  }
}
