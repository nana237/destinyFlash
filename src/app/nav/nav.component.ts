import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { PanierService } from '../panier.service';
import { SeConnecterComponent } from '../se-connecter/se-connecter.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [PanierService,SeConnecterComponent]
})
export class NavComponent {
  sessionActuelle;
  paniers;
  panier;
  sousMenu1Visible=false;
  icon1Visble=true;
  menuMobileVisible=false;
  btnShowMenuVisible=true;
  admin = false;
  connecter = false;
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    
  constructor(
    private breakpointObserver: BreakpointObserver,
    private _panier : PanierService,
    private _seConnecterComponent : SeConnecterComponent,
    ) {

      this.getSessionActuelle();
      if(this.sessionActuelle.type=="AgentDestiny"){
        this.admin = true;
      }
      if(this.sessionActuelle.etat!="desactivé"){
        this.connecter = true;
      }
      console.log(this.sessionActuelle);
    }

    onSeconnnecter(){
      
    }

    onCacherMenuMobile(){
      this.menuMobileVisible=false;
      this.btnShowMenuVisible=true;
    }
    onShowMenuMobile(){
      if (this.menuMobileVisible) {
        this.menuMobileVisible=false;
        this.btnShowMenuVisible=true;
      }else{
        this.menuMobileVisible=true;
        this.btnShowMenuVisible=false;
      }
    }

    onSubMenu1(){
      if (this.icon1Visble) {
        this.icon1Visble=false;
        this.sousMenu1Visible=true;
      }else{
        this.icon1Visble=true;
        this.sousMenu1Visible=false;

      }
    }

    getSessionActuelle(){
      this.sessionActuelle = this._seConnecterComponent.getSessionActuelle();
    }

    getAllPanier(){
      this._panier.getAllPanier().subscribe(
        data=>{
          this.paniers=data;
          console.log(this.paniers);
          this.panier=this.getPanier(this.sessionActuelle.id);
        },
        error=>{
          console.log(error);
        }
      )
    }
   

    getPanier(client){
      
    
        for (let i = 0; i < this.paniers.length; i++) {
          const val = this.paniers[i];
          if (client==val.client) { //test
            //if (client.id=val.client) {
              
            this.panier=val;
        //    console.log("affichage du panier");
       //     console.log(this.panier);
            break;
          }
        }
        console.log(this.panier);
        return this.panier;
    
      }
  
}
