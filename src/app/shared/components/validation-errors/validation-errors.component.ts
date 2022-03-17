import { Component, DoCheck, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-validation-errors',
  templateUrl: './validation-errors.component.html',
})
export class ValidationErrorsComponent implements OnInit{

  @Input() validators : any;
  @Input() formcontrolName: string;
  @Input() formcontrol : FormControl | undefined;
  errors : Array<string> = [];

  constructor() {
    this.formcontrolName = '';
  }

  ngOnInit(): void {
    this.errors = Object.keys(this.formcontrol?.errors || {});
  }

  ngDoCheck() : void{
    this.errors = Object.keys(this.formcontrol?.errors || {});
  }

}
