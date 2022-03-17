import { ChangeType } from "../constants/change-type";

export default interface IAddressBookChange{
    type : ChangeType,
    id : number
}