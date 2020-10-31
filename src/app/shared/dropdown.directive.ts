import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';


@Directive({
    selector: '[appDropdown]',
    exportAs: 'appDropdown'
})
export class DropdownDirective
{
    showMenu = false;

    // click on element(dropdown toggle{button}) -> show/hide dropdownmenu

    /* @HostListener('click') dropdownToggler1(){
        this.showMenu = !this.showMenu;
    }  */  


    // + click  anywhere else on the document -> hide dropdown menu

    @HostListener('document:click', ['$event']) dropdownToggler2(event: Event){
        // this.showMenu = !this.showMenu;
        this.showMenu = this.elRef.nativeElement.contains(event.target) ? !this.showMenu : false;
    }   

    constructor(private elRef: ElementRef){}
}