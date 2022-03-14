import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import AddressBookContact from '../interfaces/address-book-contact.interface';
import AddressBookService from '../services/address-book.service';
import { NotificationService } from '../services/notification.service';
import { regex } from '../util/constants';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit{

  @Input() contact : AddressBookContact | undefined;
  contactForm : FormGroup | undefined;
  @Output() close : EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor( private addressBookService : AddressBookService , private notificationService : NotificationService ) {}

  ngOnInit(){
    const contact : AddressBookContact = this.contact ? this.contact : {} as any;
    this.contactForm = new FormGroup({
      name : new FormControl( contact.name || '' , [Validators.required] ),
      email : new FormControl( contact.email || '' , [Validators.required , Validators.email] ),
      mobile : new FormControl( contact.mobile || '' , Validators.pattern( regex.contactNumber )),
      landline : new FormControl(contact.landline || '' , Validators.pattern( regex.contactNumber )),
      website : new FormControl( contact.website || '', Validators.pattern(regex.website) ),
      address : new FormControl( contact.address || '')
    })
  }

  getValue( formControlName : string ){ return this.contactForm?.get(formControlName) || {} as any }

  saveContact() : void{
    if( !this.contactForm || !this.contactForm.valid ){
      return;
    }
    if( this.contact ){
      this.addressBookService.editContact( this.contact.id , this.contactForm.value );
      this.notificationService.success('Contact Edited Successfully');
    }else{
      this.addressBookService.addContact(this.contactForm.value);
      this.notificationService.success('Contact Added Successfully')
    }
    this.close.emit(true);
  }
  


}
