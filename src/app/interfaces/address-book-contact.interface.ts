import IContact from "./contact.interface";

export default interface IAddressBookContact extends IContact{
    id : number , 
    isDeleted : boolean
}