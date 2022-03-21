import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import AddressBookChange from "../interfaces/address-book-change";
import IAddressBookContact from "../interfaces/address-book-contact.interface";
import IContact from "../interfaces/contact.interface";
import { ChangeType } from "../constants/change-type";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn : 'root' })
export default class AddressBookService{
    private contacts : Array<IAddressBookContact> | undefined = undefined;
    observers : Array<Observer<AddressBookChange>> = [];

    constructor( private httpClient : HttpClient ){}

    addContact( contact : IContact ) : boolean{
        if( !this.contacts ){
            return false;
        }
        this.contacts.push({...contact , id : this.contacts.length , isDeleted : false});
        this.sendChanges({ type : ChangeType.added , id : this.contacts.length - 1 });
        return true;
    }

    getAllContacts() : Array<IAddressBookContact> | Observable<Array<IAddressBookContact>>{
        if( this.contacts){
            return this.contacts.filter( contact => !contact.isDeleted );
        }
        const contacts = this.httpClient.get<Array<IAddressBookContact>>('../../../assets/contacts.json');
        contacts.subscribe( contacts => this.contacts = contacts );
        return contacts;
    }

    removeContact(id : number) : boolean{
        if( !this.contacts ){
            return false;
        }
        const contact : IAddressBookContact | undefined = this.contacts.find( contact => contact.id === id  && !contact.isDeleted);
        if( contact ){
            contact.isDeleted = true;
            this.sendChanges({ type : ChangeType.removed , id : id });
            return true;
        }
        return false;
    }

    getContact( id : number ): Observable<IAddressBookContact>{
        const contact : Observable<IAddressBookContact> = new Observable<IAddressBookContact>( observer => {
            const findContact =  setInterval(() => {
                if( this.contacts ){
                    observer.next( this.contacts.find( contact => contact.id === id && !contact.isDeleted ) );
                    observer.unsubscribe();
                    clearInterval(findContact);
                    return;
                }
            },100);
        });
        return contact;
    }

    getChanges() : Observable<AddressBookChange>{
        const observable : Observable<AddressBookChange> = new Observable(observer => {
            this.observers.push(observer);
        });
        return observable;
    }

    sendChanges( changes : AddressBookChange ) : void{
        for( let observer of this.observers ){
            observer.next(changes);
        }
    }

    editContact( id : number , contact : IAddressBookContact) : boolean{
        if( !this.contacts ){
            return false;
        }
        const contactIndex : number = this.contacts.findIndex( (contact , index) => contact.id === id && !contact.isDeleted );
        if( contactIndex > -1 ){
            this.contacts[contactIndex] = { ...this.contacts[contactIndex] , ...contact };
            this.sendChanges({ type : ChangeType.edited , id : id });
            return true;
        }
        return false;
    }

}