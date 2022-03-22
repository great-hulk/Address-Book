import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { catchError, last, Observable, of } from "rxjs";
import AddressBookService from "src/app/address-book/services/address-book.service";
import { map } from "rxjs";

@Injectable({ providedIn : 'root' })
export default class EmailUniqueValidator implements AsyncValidator{
    constructor( private addressBookService : AddressBookService ){}
    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return this.addressBookService.isEmailTaken( control.value ).pipe( map(isTaken =>  isTaken?{ emailTaken : true } : null) )
    }
} 