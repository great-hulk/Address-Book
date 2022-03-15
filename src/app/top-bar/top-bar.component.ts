import { Component, OnInit } from '@angular/core';
import AddressBookService from '../services/address-book.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent implements OnInit{
 
  contactForm : boolean = false;
  ngOnInit(): void {
    
  }
}
