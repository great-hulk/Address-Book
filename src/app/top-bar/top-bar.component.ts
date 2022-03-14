import { Component, OnInit } from '@angular/core';
import AddressBookService from '../services/address-book.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent{
  contactForm : boolean = false;
}
