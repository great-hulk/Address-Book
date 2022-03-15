import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IAddressBookContact from '../../interfaces/address-book-contact.interface';
import Contact from '../../models/contact.model';
import AddressBookService from '../../services/address-book.service';
import { NotificationService } from '../../services/notification.service';
import Regex from '../../models/regex.model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent implements OnInit{

  @Input() contact : IAddressBookContact | undefined;
  contactForm : FormGroup | undefined;
  @Output() close : EventEmitter<boolean> = new EventEmitter<boolean>();

  validators = {
    name : {
      required : 'Name is required'
    },
    email : {
      required : 'Email is required',
      email: 'Email is invalid',
    },
    mobile : {
      pattern : 'Mobile is invalid'
    },
    landline : {
      pattern : 'Landline is invalid'
    },
    website : {
      pattern : 'Website is invalid'
    }
  }

  constructor( private addressBookService : AddressBookService , private notificationService : NotificationService ) {}

  ngOnInit(){
    const contact : IAddressBookContact = this.contact ? this.contact : {} as any;
    this.contactForm = new FormGroup({
      name : new FormControl( contact.name || '' , [Validators.required] ),
      email : new FormControl( contact.email || '' , [Validators.required , Validators.email] ),
      mobile : new FormControl( contact.mobile || '' , Validators.pattern( Regex.contactNumber )),
      landline : new FormControl(contact.landline || '' , Validators.pattern( Regex.contactNumber )),
      website : new FormControl( contact.website || '', Validators.pattern(Regex.website) ),
      address : new FormControl( contact.address || '')
    })
  }

  getValue( formControlName : string ){ return this.contactForm?.get(formControlName) || {} as any }
  getContact() : Contact{
    const contact : Contact = new Contact();
    contact.Name = this.contactForm?.get('name')?.value;
    contact.Email = this.contactForm?.get('email')?.value;
    contact.Mobile = this.contactForm?.get('mobile')?.value;
    contact.Landline = this.contactForm?.get('landline')?.value;
    contact.Website = this.contactForm?.get('website')?.value;
    contact.Address = this.contactForm?.get('address')?.value;

    return contact;
  }

  addContact() : void{
    if( !this.contactForm || !this.contactForm.valid ){
      return;
    }
    this.addressBookService.addContact(this.getContact());
    this.notificationService.success('Contact Added Successfully');
    this.close.emit(true);
  }

  editContact() : void{
    if(!this.contact || !this.contactForm || !this.contactForm.valid ){
      return;
    }
    this.addressBookService.editContact( this.contact.id , (this.getContact() as any) as IAddressBookContact );
    this.notificationService.success('Contact Edited Successfully');
    this.close.emit(true);
  }
}
