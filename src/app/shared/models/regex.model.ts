export default class Regex{
    static website : RegExp = /^((http[s]?\:\/\/|www\.)[A-Za-z0-9]+[\-\w][A-Za-z0-9]([\-\_]?[A-Za-z0-9]+)*(\.[A-Za-z0-9]{2,3}){1,3})$/;
    static contactNumber : RegExp = /^(\+[0-9]{2}){0,1}^[0-9]{10}$/
}