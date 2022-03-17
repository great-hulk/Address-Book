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

}