import { Component, OnInit,Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ExpenseService } from '../expense.service';
import { Expense } from '../expense';


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

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
  }

  addExpense(){
    let ex={
      title: this.title.value,
      price: this.price.value,
      category: this.category.value,
      description: this.description.value,
      purchaseDate: this.purchaseDate.value

    }
    this.expenseService.addExpense(ex).subscribe(response=>{
      console.log(response)
    })
  }

}
