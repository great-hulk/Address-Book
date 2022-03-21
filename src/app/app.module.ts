import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactListComponent } from './address-book/components/contact-list/contact-list.component';
import { AddressBookComponent } from './address-book/address-book.component';
import { ContactCardComponent } from './address-book/components/contact-list/contact-card/contact-card.component';
import { ContactFormComponent } from './address-book/shared/components/contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ValidationErrorsComponent } from './shared/components/validation-errors/validation-errors.component';

import { HttpClientModule } from '@angular/common/http';

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
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
