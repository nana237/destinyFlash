import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { AppComponent } from '../app.component';
// import { NavComponent } from '../nav/nav.component';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import { AgentDestinyService } from '../agent-destiny.service';
import { browser } from 'protractor';

@Component({
  selector: 'app-se-connecter',
  templateUrl: './se-connecter.component.html',
  styleUrls: ['./se-connecter.component.css'],
  providers: [AppComponent,
  //  NavComponent,
  ]

})
export class SeConnecterComponent implements OnInit {

  trouver=false;
  session;
  sessionActuelle;
  isConnecter=false;
  
  constructor(
    private _client : ClientService,
    private _agentDestiny : AgentDestinyService,
    private appComponennt : AppComponent,
    private _router : Router,
   // private _navComponent : NavComponent,
    private _appComponent : AppComponent
  ) { 
    this.session={
      id:-1,
      login:"",
      password:"",
      type:"",
      etat:"desactivé",
    }



    
    
    this.sessionActuelle = this.getSessionActuelle();
    if(this.sessionActuelle.id > -1){
      this.isConnecter=true;
    }else{
      this.isConnecter = false;
    }
  }

  forgetPassword(){
    console.log("cool");
  }

  
  onS_inscrire(){
      this._router.navigate(['inscription']);
  }
  
  se_Deconnecter(){
    this.sessionActuelle={
      id:-1,
      login:"",
      password:"",
      type:"",
      etat:"desactivé",
    }
    
    this.partargerSession(this.sessionActuelle);
    this.show("Vous êtes à présent déconnecté");
    this.isConnecter=false;
  }
  
  show(message){
    Swal.fire({
    //  position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }

  showError(message){
    Swal.fire({
    //  position: 'top-end',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }

  afficher2(){
    console.log("this.sessionActuelle");
    this.sessionActuelle=this.getSessionActuelle();
    console.log(this.sessionActuelle);

  }

  afficher(){
    console.log("this.session");
    console.log(this.session);

    console.log("this.sessionActuelle");
    console.log(this.sessionActuelle);
  }

  se_Connecter(){
    this.s_authentifier();
   // this.sessionActuelle=this.session;
  // this.sessionActuelle=this.getSessionActuelle();
    this._router.navigate['app'];
   console.log("this.sessionActuelle");
    console.log(this.sessionActuelle);
   // this._appComponent.sessionActuelle=this.sessionActuelle;
    
  }
  
  partargerSession(session){
    console.log("session.id");
    console.log(session.id);
    localStorage.setItem("idActuelle",session.id);
    localStorage.setItem("loginActuelle",session.login);
    localStorage.setItem("passwordActuelle",session.password);
    localStorage.setItem("typeActuelle",session.type);
    localStorage.setItem("etatActuelle",session.etat);
  }

  getSessionActuelle(){

    return {
      id:localStorage.getItem("idActuelle"),
      login:localStorage.getItem("loginActuelle"),
      password:localStorage.getItem("passwordActuelle"),
      type:localStorage.getItem("typeActuelle"),
      etat:localStorage.getItem("etatActuelle"),
    }
     
  }

  getSessionActuelle2(){
   var  session={
      id:localStorage.getItem("idActuelle"),
      login:localStorage.getItem("loginActuelle"),
      password:localStorage.getItem("passwordActuelle"),
      type:localStorage.getItem("typeActuelle"),
      etat:localStorage.getItem("etatActuelle"),
    }

    return session;
    
     
  }

  s_authentifier(){
  //  console.log("affichage de la session ");
  //  console.log(this.session);
    this._client.getAllClient().subscribe(
      

      data=>{
      //  console.log(data);
        for (let i = 0; i < data.length; i++) {
          const client = data[i];
          if (client.loginC==this.session.login) {
            if (client.motDePassC==this.session.password) {
              this.trouver=true;
              this.session.type="client";
              this.session.id=client.id;
              break;
            }else{
             // console.log("affichage du client");
             //console.log(client);
              this.trouver=false;
            }
          }else{
           // console.log("affichage du client");
           // console.log(client);
            this.trouver=false;
          }
        }

        if (this.trouver) {
          console.log("connection effectué avec succes");
          this.session.etat="activé";
          this._router.navigate(['accueil']);
        }else{
          

          console.log("login ou mot de passe incorrect");
          this.session.etat="desactivé";

        }

        console.log(this.session);
        
        this.partargerSession(this.session);
        this.sessionActuelle=this.getSessionActuelle();

        
        if(this.trouver){
          this.show("vous êtes à présent connecté !");
          this._router.navigate(['accueil']);
        } else {
          this._agentDestiny.getAllAgentDestiny().subscribe(
            data=>{
              console.log(data);
              for (let i = 0; i < data.length; i++) {
                const agentD = data[i];
                if (agentD.loginA==this.session.login) {
                  if (agentD.motDePassA==this.session.password) {
                    this.trouver=true;
                    this.session.type="AgentDestiny";
                    this.session.id=agentD.id;
                    break;
                  }else{
                   // console.log("affichage du client");
                   //console.log(client);
                    this.trouver=false;
                  }
                }else{
                 // console.log("affichage du client");
                 // console.log(client);
                  this.trouver=false;
                }
              }

              if (this.trouver) {
                this.show("vous êtes à présent connecté !");
                this.session.etat="activé";
                this.partargerSession(this.session);
                this.sessionActuelle=this.getSessionActuelle();
                this._router.navigate(['accueil']);
              }else{
                this.showError("login ou mot de pass incorrect");
              }

            },
            error=>{
              console.log(error);
            }
          );

            /*
          console.log(this.trouver);
          if (this.trouver) {
            console.log("connection effectué avec succes");
            this.session.etat="activé";
          }else{
            this.showError("login ou mot de pass incorrect");
          }
          */

        }
      },
      error=>{
        console.log(error);
      }
    );
    console.log(this.session);

  }

  ngOnInit() {
  }

}
