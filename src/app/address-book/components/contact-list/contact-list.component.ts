import { Component, OnInit, Output , Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import IAddressBookContact from '../../interfaces/address-book-contact.interface';
import AddressBookService from '../../services/address-book.service';
import { ChangeType } from '../../constants/change-type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls:['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts : Array<IAddressBookContact>;
  contactIdSelected : number | undefined;
  contactIdIfDeleted : number | undefined = undefined; 

  constructor( private addressBookService : AddressBookService ) {
    this.contacts = [];
    this.contactIdSelected = undefined;
  }
  ngOnInit(): void {
    (this.addressBookService.getAllContacts() as Observable<Array<IAddressBookContact>>).subscribe( contacts => {
      this.contacts = contacts;
      if( this.contacts.length > 0 ){
        this.onContactSelected( this.contacts[0].id );
      }
    }) ;

    this.addressBookService.getChanges().subscribe(changes  => {
      this.getAllContacts();
      switch( changes.type ){
        case ChangeType.edited:
          this.onContactSelected( this.contactIdSelected );
          break;
        case ChangeType.removed:
          this.onContactSelected( this.contactIdIfDeleted );
          break;
        case ChangeType.added:
          this.onContactSelected( changes.id );
      }
    })
  }
  onContactSelected(id : number | undefined) : void{
    this.contactIdSelected = id;
    this.getContactChosenIfDeleted();
  }

  getAllContacts() : void{
    this.contacts = this.addressBookService.getAllContacts() as Array<IAddressBookContact>;
  }

  getContactChosenIfDeleted() : void{
    if( this.contactIdSelected === undefined || this.contacts.length < 2 ){
      this.contactIdIfDeleted = undefined;
      return;
    }
    if( this.contactIdSelected === this.contacts[0].id ){
      this.contactIdIfDeleted = this.contacts[1].id;
      return;
    }
    this.contacts.forEach( (contact , index) => {
      if( contact.id === this.contactIdSelected ){
        this.contactIdIfDeleted = this.contacts[index-1].id;
      }
    })
  }
}
