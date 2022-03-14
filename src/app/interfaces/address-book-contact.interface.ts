import Contact from "./contact.interface";

export default interface AddressBookContact extends Contact{
    id : number , 
    isDeleted : boolean
}