import { Component, OnInit, Output , Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import AddressBookContact from '../interfaces/address-book-contact.interface';
import Contact from '../interfaces/contact.interface';
import AddressBookService from '../services/address-book.service';
import { ChangeType } from '../util/constants';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls:['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts : Array<AddressBookContact>;
  @Output() contactClicked : EventEmitter<number>= new EventEmitter<number>();
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
    this.contactClicked.emit(id);
  }

  getAllContacts() : void{
    this.contacts = this.addressBookService.getAllContacts();
  }

  getContactChosenIfDeleted() : void{
    if( this.contactSelected === undefined || this.contacts.length < 2 ){
      return;
    }
    if( this.contactSelected === this.contacts[0].id ){
      this.contactIfDeleted = this.contacts[1].id;
      return;
    }
    for( let i = 1 ; i < this.contacts.length ; i++ ){
      if( this.contacts[i].id === this.contactSelected ){
        this.contactIfDeleted = this.contacts[i-1].id;
        break;
      }
    }
  }
}
