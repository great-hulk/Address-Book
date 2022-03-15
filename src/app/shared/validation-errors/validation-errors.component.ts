import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-validation-errors',
  templateUrl: './validation-errors.component.html',
})
export class ValidationErrorsComponent implements OnInit , OnChanges{

  @Input() validators : any;
  @Input() errors : { [index:string] : boolean };
  @Input() formcontrolName: string | undefined;
  allErrors : Array<String>;

  constructor() {
    this.errors = {};
    this.allErrors = [];
  }

  ngOnInit(): void {
    this.allErrors = [];
    if( this.errors ){
      for( let error in this.errors ){
        this.allErrors.push( this.validators[this.formcontrolName as string][ error ] )
      }
    }
  }

  ngOnChanges():void{
    this.allErrors = [];
    if( this.errors ){
      for( let error in this.errors ){
        this.allErrors.push( this.validators[this.formcontrolName as string][ error ] )
      }
    }
  }
}
