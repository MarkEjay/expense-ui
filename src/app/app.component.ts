import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ExpenseCreateComponent} from './expense/expense-create/expense-create.component'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public dialog: MatDialog){}

  openDialog(){
    const dialogRef = this.dialog.open(ExpenseCreateComponent);

    dialogRef.afterClosed().subscribe(result =>{
      console.log('Dialog closed')
    })
  }
}

// @Component({
//   selector: 'app-expense-create',
//   templateUrl: './expense/expense-create/expense-create.component.html'
// })

// export class ExpenseCreateComponent{}
