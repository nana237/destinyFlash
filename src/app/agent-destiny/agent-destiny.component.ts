import { Component, OnInit } from '@angular/core';
import { AgentDestinyService } from '../agent-destiny.service';
import { PanierService } from '../panier.service';

@Component({
  selector: 'app-agent-destiny',
  templateUrl: './agent-destiny.component.html',
  styleUrls: ['./agent-destiny.component.css'],
  providers: [AgentDestinyService]
})
export class AgentDestinyComponent implements OnInit {

  agentsDestinys;
  selectedagentDestiny;
  formVisible=false;
  modifierVisible=false;
  annulerVisible = false;
  creerVisible = false;
  idVisible = false;
  labelDuForm='';
  panier;
  val0;


  constructor(
    private _agentDestiny : AgentDestinyService,
    private _panier : PanierService
  ) { 
    this.getAgentD();
  
    this.selectedagentDestiny={
      id:-1,
      nomA:'cool ',
      prenomA: 'cool',
      dateNaissA:'2012-12-12',
      emailA:'fdgds@yahoo.com',
      sexeA:'M',
      adresseA:'sdfa',
      villeA:'sdfgds',
      quartierA:'asdfa',
      numCNI_A:'hjk ',
      telA:987456321,
      loginA:'ghjk',
      motDePassA:'vghj'
    }
  }


  
  modifierAgentD(){
    this.updateAgentD();
    this.formVisible=false;
  }
  
  creerPanier(agentD){
    console.log("nous sommes dans créer panier. nous affichons le client actuelle");
    console.log(agentD);
    this.panier={
      id:-1,
      libPanier:'panier de ' + agentD.nomA,
      client:agentD.id,
      articles: []
    }

    console.log("affichage du panier");
    console.log(this.panier);
    console.log("création du panier");
    
    this._panier.createPanier(this.panier).subscribe(
      data=>{
        console.log("panier creer avec succes");
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
  }
  
  creerAgentD(){
    console.log(this.selectedagentDestiny);
    this.creatAgentD();
    console.log(this.selectedagentDestiny);
    //this.creatpanier();
    //this.creerpanier();
   // this.creerPanier(this.val0);
    
    this.formVisible=false;
  }
  showFormModifier(agentD){
    //console.log("afficage de val0");
    //console.log(this.val0);
   this.labelDuForm='Modification de l\'agent Destiniy ';
   this.formVisible=true;
   this.modifierVisible=true;
   this.annulerVisible = true;
   this.creerVisible = false;
   this.idVisible = false;
   this.AgentDestinySelected(agentD);
   
  }
  showFormCreer(){
   this.labelDuForm='Ajout d\'un agents Destinys ';
   this.formVisible=true;
   this.modifierVisible=false;
   this.annulerVisible = true;
   this.creerVisible = true;
   this.idVisible = false;
  }

   getAgentD = ()=>{
     this._agentDestiny.getAllAgentDestiny().subscribe(
       data=>{
         this.agentsDestinys=data;
         console.log(this.agentsDestinys);
       },
       error =>{
         console.log(error);
       }
     )
   }

  // getlastClient = ()=>{
  creatpanier = ()=>{
    // this.getClient();
    // console.log("affichage du client");
    // console.log(this.clients[1]);

     this._agentDestiny.getAllAgentDestiny().subscribe(
      data=>{
        
        console.log("recuperaiton des agents Destinys");
        this.agentsDestinys=data;
        console.log(this.agentsDestinys);
        console.log("affichage du nombre d'agents Destinys");
        console.log(this.agentsDestinys.length);
        this.val0=this.agentsDestinys[0]
        for (let i = 1; i < this.agentsDestinys.length; i++) {
          const val = this.agentsDestinys[i];
          if (val.id>this.val0.id) {
            this.val0=val;
          }
        }
        
        console.log("affichage du dernier agents Destinys ");
        console.log(this.val0);
        this.creerPanier(this.val0);

      },
      error =>{
        console.log(error);
      }
    )
/*
    console.log(this.val0);
    this.panier={
      id:-1,
      libPanier:'panier de ' + this.val0.nom,
      client:this.val0.id,
      articles: []
    }
    console.log("création du panier");
    
    this._panier.createPanier(this.panier).subscribe(
      data=>{
        console.log("panier creer avec succes");
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
*/
   }

   AgentDestinySelected=(agentD)=>{
     // console.log(movie.id);
      this._agentDestiny.getOneAgentDestiny(agentD.id).subscribe(
        data=>{
          this.selectedagentDestiny=data;
          console.log(this.selectedagentDestiny);
        },
        error =>{
          console.log(error);
        }
      );
    }

    annulerModif(){
    //  this.agentsDestinys=-1;
      this.formVisible=false;
    }
    updateAgentD = ()=>{
     this._agentDestiny.updateAgentDestiny(this.selectedagentDestiny).subscribe(
       data=>{
         this.getAgentD();
       },
       error =>{
         console.log(error);
       }
     )
   }

   creatAgentD = () =>{
     this._agentDestiny.createAgentDestiny(this.selectedagentDestiny).subscribe(
       data=>{
        this.getAgentD();
        this.agentsDestinys=data;
        // this.creatpanier();
      //  this.creerPanier(this.selectedagentDestiny);
       },
       error =>{
         console.log(error);
       }
     );
   }
   supprimerAgentD(agentD){
     if (confirm('êtes vous sur de vouloir suprimer cet element ?')) {
       this.deleteAgentD(agentD);
     }
     
   }
   deleteAgentD(agentD){
     this._agentDestiny.deleteAgentDestiny(agentD.id).subscribe(
       data=>{
       this.getAgentD();
       
       },
       error =>{
         console.log(error);
       }
     );
   }



  ngOnInit() {
  }

}
