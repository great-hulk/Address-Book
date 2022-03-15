import IContact from "../interfaces/contact.interface";

export default class Contact implements IContact{
    name: string;
    email:string;
    mobile?:string;
    landline?:string;
    website?:string;
    address?:string;

    constructor(){
        this.name = '';
        this.email = '';
    }

    set Name( name : string ){ this.name = name; }
    set Email( email : string ){ this.email = email; }
    set Mobile( mobile : string ){ this.mobile = mobile; }
    set Landline( landline : string ){ this.landline = landline; }
    set Website( website : string ){ this.website = website; }
    set Address( address : string ){ this.address = address; }

}