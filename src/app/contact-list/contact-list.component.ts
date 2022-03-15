import { Component, OnInit, Output , Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import IAddressBookContact from '../interfaces/address-book-contact.interface';
import AddressBookService from '../services/address-book.service';
import { ChangeType } from '../util/constants';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls:['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts : Array<IAddressBookContact>;
  contactSelected : number | undefined;
  contactIfDeleted : number | undefined = undefined; 

  constructor( private addressBookService : AddressBookService ) {
    this.contacts = [];
    this.contactSelected = undefined;
  }
  ngOnInit(): void {
    this.getAllContacts();
    
    if( this.contacts.length > 0 ){
      this.clickContact( this.contacts[0].id );
    }

    this.addressBookService.getChanges().subscribe(changes  => {
      this.getAllContacts();
      switch( changes.type ){
        case ChangeType.edited:
          this.clickContact( this.contactSelected );
          break;
        case ChangeType.removed:
          this.clickContact( this.contactIfDeleted );
          break;
        case ChangeType.added:
          this.clickContact( changes.id );
      }
    })
  }
  clickContact(id : number | undefined) : void{
    this.contactSelected = id;
    this.getContactChosenIfDeleted();
  }

  getAllContacts() : void{
    this.contacts = this.addressBookService.getAllContacts();
  }

  getContactChosenIfDeleted() : void{
    if( this.contactSelected === undefined || this.contacts.length < 2 ){
      this.contactIfDeleted = undefined;
      return;
    }
    if( this.contactSelected === this.contacts[0].id ){
      this.contactIfDeleted = this.contacts[1].id;
      return;
    }
    this.contacts.forEach( (contact , index) => {
      if( contact.id === this.contactSelected ){
        this.contactIfDeleted = this.contacts[index-1].id;
      }
    })
  }
}
