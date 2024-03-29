import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  public opened: boolean = true;
  public isSideNavInSideMode: boolean = true;
  public currentSidenavToggleButtonIcon: string;
  public icons = {cart:'shopping_cart', account:'account_circle', login:'how_to_reg', clear:'clear'};
  
  constructor(
    public router : Router,
    public _userService: UserService,

    ) { }
    
    public isToggleButtonHidden = () => {
      
      return this.router.url === "/register";
      
    };
    
    public isSideNavHidden = () => {
      
      return this.router.url === "/register" || this._userService.recieptReady;
      
    };
    
    public toggleSideNav = () => {
      
      this.opened = !this.opened;
      this.toggleSidenavToggleButtonIcon();
      
    };
    
    // TODO: create toggle function for sidenav mode
    // when  screen is small, sidenav should be over main component not adjsent
    // function { if screen size is small return 'over' else return 'side' }
    
    // TODO: create a button that is shown only when screen is small
    // button controls the open/close function of the sidenav
    
    public getSidenavToggleButtonIcon = (currentUrl: string) => {

      switch (currentUrl) {
        case "/welcome":
          return this.icons['login'];
      
        case "/shop":
        case "/order":
          return this._userService.user?.isAdmin ? this.icons['cart'] : this.icons['cart'];

        default:
          break;
      }

      return;
      
    };
    
    public toggleSidenavToggleButtonIcon = () => {

      if (!this.isSideNavInSideMode) {
        this.currentSidenavToggleButtonIcon = this.getSidenavToggleButtonIcon(this.router.url);
        return;
      };
      
      this.currentSidenavToggleButtonIcon = this.opened ? this.icons['clear'] : this.getSidenavToggleButtonIcon(this.router.url);
 
    };    
  };
  