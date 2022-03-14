import { Component, OnInit } from '@angular/core';
import AddressBookContact from '../interfaces/address-book-contact.interface';
import AddressBookService from '../services/address-book.service';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css']
})
export class AddressBookComponent{

  contactSelected : number;

  constructor( private addressBookService : AddressBookService ){
    this.contactSelected = -1;
  }

  changeContact( id : number ) : void{
    this.contactSelected = id;
    // console.log(event);
  }

}
