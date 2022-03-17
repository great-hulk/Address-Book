import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressBookComponent } from './address-book/address-book.component';
import { ContactListComponent } from './address-book/components/contact-list/contact-list.component';

const routes: Routes = [
  { path : '' , redirectTo: 'address-book' , pathMatch : 'full' },
  { path : 'address-book' , component : AddressBookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
