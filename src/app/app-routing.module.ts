import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressBookComponent } from './address-book/address-book.component';
import { ContactListComponent } from './contact-list/contact-list.component';

const routes: Routes = [
  { path : '' , component : AddressBookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
