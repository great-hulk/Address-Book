import { Component, OnInit , Input, OnChanges, SimpleChanges } from '@angular/core';
import IAddressBookContact from '../../../interfaces/address-book-contact.interface';
import AddressBookService from '../../../services/address-book.service';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
})
export class ContactCardComponent implements OnInit , OnChanges {

  @Input() contactIdSelected : number | undefined = undefined;
  contact : IAddressBookContact | undefined = undefined;
  contactForm : boolean = false;

  constructor( private addressBookService : AddressBookService , private notificationService : NotificationService ) { }

  ngOnInit(): void {
    this.getContact();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( (changes as any).contactIdSelected.previousValue !== this.contactIdSelected ){
      this.getContact();
    }
  }

  getContact():void{
    if( this.contactIdSelected !== undefined && this.contactIdSelected > -1 ){
      this.addressBookService.getContact(this.contactIdSelected).subscribe( contact => this.contact = contact );
      return;
    }
    this.contact = undefined;
  }

  removeContact() : void{
    if( !this.contact || !this.addressBookService.removeContact(this.contact.id) ){
      return;
    }
    this.notificationService.success('Contact Deleted Successfully');
  }
}
