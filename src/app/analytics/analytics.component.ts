import { Component, OnInit, Input } from '@angular/core';
import {Chart, registerables } from 'chart.js';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import { ExpenseService } from '../expense/expense.service';
import {Expense} from '../expense/expense'

import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
Chart.register(...registerables);

//ERROR - Value runs everytime the page loads making the value to keep adding 
var selectedMonth=0;
var selectedYear=0;
var housingPrice:number;
var transportationPrice:number;
var foodPrice:number;
var clothingPrice:number;
var otherPrice: number;
//var others:number;

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})


export class AnalyticsComponent implements OnInit {

  expense: Expense[]=[];

 // @Input() housingPrice=0;
  date = new FormControl(moment());
  housingCat=0;
  transportationCat=0;
  foodCat=0;
  clothingCat=0;
  others=0;
  
  constructor(
    private expenseService: ExpenseService  ) {
     
    }
    
  getOthersPrice(){
    this.expenseService.getAllexpense().subscribe(data => {
      this.expense=data.expense;
    //  console.log(this.expense)
      for(var i in this.expense){
        if(this.expense[i].category == 'other'){
          this.others+=this.expense[i].price
          otherPrice = this.others;
          //console.log(otherPrice)
        }
      }
    })
  }

  
  getHousingPrice(){
    this.expenseService.getAllexpense().subscribe(data => {
      this.expense=data.expense;
   //   console.log(this.expense)
      for(var i in this.expense){
        if(this.expense[i].category == 'housing'){
          this.housingCat+=this.expense[i].price
          housingPrice=this.housingCat;
          //housingPrice=this.clothingCat;
          //console.log(this.clothingCat)
        }
      }

    })
  }
  getTransportationPrice(){
    this.expenseService.getAllexpense().subscribe(data => {
      this.expense=data.expense;
    //  console.log(this.expense)
      for(var i in this.expense){
        if(this.expense[i].category == 'transportation'){
          this.transportationCat+=this.expense[i].price
          transportationPrice=this.transportationCat
         console.log(this.transportationCat)
        }
      }

    })
  }
  getFoodPrice(){
    this.expenseService.getAllexpense().subscribe(data => {
      this.expense=data.expense;
    //  console.log(this.expense)
      for(var i in this.expense){
        if(this.expense[i].category == 'food'){
          this.foodCat+=this.expense[i].price
          foodPrice=this.foodCat
        console.log(foodPrice)
        }
      }       // return foodP;

    })

  }
  getClothingPrice(){
    this.expenseService.getAllexpense().subscribe(data => {
      this.expense=data.expense;
    //  console.log(this.expense)
      for(var i in this.expense){
        if(this.expense[i].category == 'clothing'){
          this.clothingCat+=this.expense[i].price
          clothingPrice=this.clothingCat
         // console.log(this.clothingCat)
        }
      }
    })
  }
  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();

   //console.log(normalizedMonthAndYear.month()+1);
    //console.log(normalizedMonthAndYear.year());
    selectedMonth=normalizedMonthAndYear.month()+1;
    selectedYear=normalizedMonthAndYear.year();

   // console.log(`You selected ${selectedMonth} and ${selectedYear}`)
  } 
  //store the month and year in a variable
 /*Add Category Options
Housing/Rent
Transportation
Food
Utilities
Medical
Savings
Entertainment
Others
*/
  ngOnInit(): void {
    
    this.getOthersPrice()
    this.getFoodPrice()
    this.getTransportationPrice()
    this.getHousingPrice()
    this.getClothingPrice()
    const myChart = new Chart('myChart', {
      
      type: 'pie',
      data: {
          labels: ['Housing/Rent', 'Transportation', 'Food', 'Clothing','Others',],
          datasets: [{
              label: '# of Votes',
              data: [housingPrice,transportationPrice,foodPrice,clothingPrice,otherPrice],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        maintainAspectRatio: false,
    }

  });

  }


}
