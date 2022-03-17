import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import AddressBookChange from "../interfaces/address-book-change";
import IAddressBookContact from "../interfaces/address-book-contact.interface";
import IContact from "../interfaces/contact.interface";
import { ChangeType } from "../constants/change-type";

@Injectable({ providedIn : 'root' })
export default class AddressBookService{
    private contacts : Array<IAddressBookContact>;
    observers : Array<Observer<AddressBookChange>> = [];

    constructor(){
        this.contacts = [
            { id : 0 , name : 'John Doe' , email : 'johndoe@johndoe.com' , isDeleted : false },
        ];
    }

    addContact( contact : IContact ) : boolean{
        this.contacts.push({...contact , id : this.contacts.length , isDeleted : false});
        this.sendChanges({ type : ChangeType.added , id : this.contacts.length - 1 });
        return true;
    }

    getAllContacts() : Array<IAddressBookContact>{
        return this.contacts.filter( contact => !contact.isDeleted )
    }

    removeContact(id : number) : boolean{
        const contact : IAddressBookContact | undefined = this.contacts.find( contact => contact.id === id  && !contact.isDeleted);
        if( contact ){
            contact.isDeleted = true;
            this.sendChanges({ type : ChangeType.removed , id : id });
            return true;
        }
        return false;
    }

    getContact( id : number ): IAddressBookContact | undefined{
        const contact : IAddressBookContact | undefined = this.contacts.find( contact => contact.id === id && !contact.isDeleted );
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
        const contactIndex : number = this.contacts.findIndex( (contact , index) => contact.id === id && !contact.isDeleted );
        if( contactIndex > -1 ){
            this.contacts[contactIndex] = { ...this.contacts[contactIndex] , ...contact };
            this.sendChanges({ type : ChangeType.edited , id : id });
            return true;
        }
        return false;
    }

}