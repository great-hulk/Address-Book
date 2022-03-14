import { Component, OnInit , Input, OnChanges, SimpleChanges } from '@angular/core';
import AddressBookContact from '../interfaces/address-book-contact.interface';
import AddressBookService from '../services/address-book.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css']
})
export class ContactCardComponent implements OnInit , OnChanges {

  @Input() contactSelected : number | undefined = undefined;
  contact : AddressBookContact | undefined = undefined;
  contactForm : boolean = false;

  constructor( private addressBookService : AddressBookService , private notificationService : NotificationService ) { }

  ngOnInit(): void {
    this.getContact();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( (changes as any).contactSelected.previousValue !== this.contactSelected ){
      this.getContact();
    }
  }

  getContact():void{
    if( this.contactSelected !== undefined && this.contactSelected > -1 ){
      this.contact = this.addressBookService.getContact(this.contactSelected);
      return;
    }
    this.contact = undefined;
  }

  removeContact() : void{
    if( !this.contact || !this.addressBookService.removeContact(this.contact.id) ){
      return;
    }
    console.log('deleted')
    this.notificationService.success('Contact Deleted Successfully');
  }
}
