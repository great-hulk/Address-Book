import { ChangeType } from "../util/constants";

export interface AddressBookChange{
    type : ChangeType,
    id : number
}