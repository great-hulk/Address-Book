import { Injectable } from "@angular/core";

const enum ErrorType{
    success ,
    error , 
    warning
};

@Injectable({ providedIn : 'root' })
export class NotificationService{

    private alert(type : number , message : string) : void{
        const allAlerts = document.getElementsByClassName('alert');
        for( let i=0; i<allAlerts.length ; i++  ){
            allAlerts[i].remove();
        }
        const alert : HTMLSpanElement = document.createElement('span');
        alert.classList.value = "fadeIn alert slide-in-alert ft-aspira";
        alert.innerText = message;
        switch (type){
            case ErrorType.success:
                alert.classList.add('success-alert');
                break;
            case ErrorType.warning:
                alert.classList.add('warning-alert');
                break;
            case ErrorType.error:
                alert.classList.add('error-alert');
                break;
            default : 
                alert.classList.add('success-alert');
        }
        document.getElementsByTagName('body')[0].append(alert);
    }

    public success( message : string ) : void{
        this.alert( ErrorType.success , message );
    }

    public warning( message : string ) : void{
        this.alert( ErrorType.warning , message );
    }

    public error( message : string ) : void{
        this.alert( ErrorType.error , message );
    }
}