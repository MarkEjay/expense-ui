import { Component, OnInit,Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ExpenseService } from '../expense.service';
import { Expense } from '../expense';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { of } from 'rxjs';
import {ExpenseListComponent} from '../expense-list/expense-list.component'


@Component({
  selector: 'app-expense-create',
  templateUrl: './expense-create.component.html',
  styleUrls: ['./expense-create.component.css'],
})
export class ExpenseCreateComponent implements OnInit {
  title= new FormControl('');
  price=new FormControl();
  category= new FormControl('');
  description= new FormControl('');
  purchaseDate= new FormControl();

  //selectedExpense: Expense;
actionBtn:string="Save"
  constructor(private expenseService: ExpenseService,
    @Inject(MAT_DIALOG_DATA) public editExpense:any,
    private dialogRef : MatDialogRef<ExpenseCreateComponent>) { }

  ngOnInit(): void {
    console.log(this.editExpense)
    console.log("hi")
    console.log(this.editExpense._id)
    if(this.editExpense){
      this.actionBtn="Update";
      this.title.setValue(this.editExpense.title);
      this.price.setValue(this.editExpense.price);
      this.category.setValue(this.editExpense.category);
      this.description.setValue(this.editExpense.description);
      this.purchaseDate.setValue(this.editExpense.purchaseDate);
    }
  }


  updateExpense(){
    let ex={
      title: this.title.value,
      price: this.price.value,
      category: this.category.value,
      description: this.description.value,
      purchaseDate: this.purchaseDate.value

    }
   this.expenseService.updateExpense(ex, this.editExpense._id)
   .subscribe(
     response=>{
      this.dialogRef.close()
       console.log(response);
     }
   )
  }

  addExpense(){
    if(!this.editExpense){
      let ex={
        title: this.title.value,
        price: this.price.value,
        category: this.category.value,
        description: this.description.value,
        purchaseDate: this.purchaseDate.value

      }
      this.expenseService.addExpense(ex).subscribe(response=>{
        window.location.reload()
      //  this.expenseService.getAllexpense()
      })
    }
    else{
      this.updateExpense()
    }

  }



}
