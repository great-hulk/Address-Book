import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import Regex from 'src/app/shared/models/regex.model';
export function pattern( regex : RegExp ) : ValidatorFn{
    return ( control : AbstractControl ) : ValidationErrors | null => {
        return !control.value.toString() || regex.test(control.value.toString()) ? null : { pattern : true }
    }
}

export function required() : ValidatorFn{
    return ( control : AbstractControl ) : ValidationErrors | null => {
        return control.value.toString() ? null : { required : true } 
    }
}
export function email() : ValidatorFn{
    return ( control : AbstractControl ) : ValidationErrors | null => {
        return !control.value.toString() || Regex.email.test( control.value.toString() ) ? null : { email : true } 
    }
}

const CustomValidators = {
    pattern , required , email
}

export default CustomValidators;
