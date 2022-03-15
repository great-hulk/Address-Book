import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { AddressBookComponent } from './address-book/address-book.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { ContactFormComponent } from './shared/contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ValidationErrorsComponent } from './shared/validation-errors/validation-errors.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    AddressBookComponent,
    ContactCardComponent,
    ContactFormComponent,
    TopBarComponent,
    ValidationErrorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
