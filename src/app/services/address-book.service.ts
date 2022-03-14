import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { AddressBookChange } from "../interfaces/address-book-change";
import AddressBookContact from "../interfaces/address-book-contact.interface";
import Contact from "../interfaces/contact.interface";
import { ChangeType } from "../util/constants";

@Injectable({ providedIn : 'root' })
export default class AddressBookService{
    private contacts : Array<AddressBookContact>;
    observers : Array<Observer<AddressBookChange>> = [];

    constructor(){
        this.contacts = [
            { id : 0 , name : 'John Doe' , email : 'johndoe@johndoe.com' , isDeleted : false },
        ];
    }

    addContact( contact : Contact ) : boolean{
        this.contacts.push({...contact , id : this.contacts.length , isDeleted : false});
        this.sendChanges({ type : ChangeType.added , id : this.contacts.length - 1 });
        return true;
    }

    getAllContacts() : Array<AddressBookContact>{
        return this.contacts.filter( contact => !contact.isDeleted )
    }

    removeContact(id : number) : boolean{
        const contact : AddressBookContact | undefined = this.contacts.find( contact => contact.id === id );
        if( contact ){
            contact.isDeleted = true;
            this.sendChanges({ type : ChangeType.removed , id : id });
            return true;
        }
        return false;
    }

    getContact( id : number ): AddressBookContact | undefined{
        const contact : AddressBookContact | undefined = this.contacts.find( contact => contact.id === id );
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

    editContact( id : number , contact : AddressBookContact) : boolean{
        const contactIndex : number = this.contacts.findIndex( (contact , index) => contact.id === id && !contact.isDeleted );
        if( contactIndex > -1 ){
            this.contacts[contactIndex] = { ...this.contacts[contactIndex] , ...contact };
            this.sendChanges({ type : ChangeType.edited , id : id });
            return true;
        }
        return false;
    }

}