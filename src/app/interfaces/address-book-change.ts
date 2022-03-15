import { ChangeType } from "../util/constants";

export default interface IAddressBookChange{
    type : ChangeType,
    id : number
}