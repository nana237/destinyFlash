import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../commande.service';
import { ArticleService } from '../article.service';
import { ClientService } from '../client.service';
import { SeConnecterComponent } from '../se-connecter/se-connecter.component';
import { DetailCommandeService } from '../detail-commande.service';
import { CaracteristiqueService } from '../caracteristique.service';
import { DetailCommandeComponent } from '../detail-commande/detail-commande.component';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css'],
  providers: [CommandeService,CaracteristiqueService,ArticleService,ClientService,SeConnecterComponent,DetailCommandeService,DetailCommandeComponent]
})
export class CommandeComponent implements OnInit {
  total;
  selecteddetail;
  commandes; 
  selectedcommande;
  selectedCommandeActuelle;
  formVisible=false;
  modifierVisible=false;
  annulerVisible = false;
  creerVisible = false;
  idVisible = false;
  listComVisible = false;
  labelDuForm='';
  articles;
  clients;
  sessionActuelle;
  commandeActuelles;
  details;
  detailActuelles;
  txtbtnListForm="AFFICHER TOUTE LES COMMNDES";



  constructor(
    private _commande: CommandeService,
    private _article : ArticleService,
    private _client : ClientService,
    private _seconnecterComponent : SeConnecterComponent,
    private _detailCom : DetailCommandeService,
    private _caracteristique : CaracteristiqueService,
    private _detailCommandeComponent : DetailCommandeComponent
  ) { 
    this.sessionActuelle = this._seconnecterComponent.getSessionActuelle();
    // this.getCommande(this.clients, this.articles);
    this.getArticle();
    this.commandeActuelles = this.getCommandeActuelle(this.sessionActuelle.id);
    this.selectedcommande={
      id:-1,
      libCmd:'teze',
      dateCmd:'2012-12-12',
      statusCmd:'EA',
      descriptionCmd:'ertgfdge',
      montantLivraisonCmd:'78567',
      client:'1',
      articles:[],
      caracteristiques:''
    }
  }

  detailSelected(detail){
    console.log();
  }

  onCommander(selecteddetail){
    console.log("cool");
  }

  onSelectionerComActuelle(commande){
    this.selectedCommandeActuelle=commande;
    console.log(commande);
  }

  onBtnListCom(){
    if (this.listComVisible) {
      this.listComVisible=false;
      this.txtbtnListForm="AFFICHER TOUTE LES COMMNDES";
    }else{
      this.listComVisible=true;
      this.txtbtnListForm="FERMER";
    }
  }
  supprimerCommande2(commande,details){
    if (confirm("etes vous sûr de vouloir annuler cette commande ?")) {
      for (let i = 0; i < details.length; i++) {
        const detail = details[i];
        this.deleteDetail(detail);
      }
     // waits(3);
      this.deleteCommande(commande);
      this.getArticle();
      this.commandeActuelles = this.getCommandeActuelle(this.sessionActuelle.id);
    }
    
  }
  deleteDetail(detail){
    this._detailCom.deleteDetailCom(detail.id).subscribe(
      data=>{console.log(data);},
      error=>{console.log(error);}
    )
  }
  choisirPhoto(commandeActuelles){
    this._caracteristique.getAllCaracteristique().subscribe(
      data=>{
        console.log("data");
        console.log(data);
        console.log("commandeActuelles");
        console.log(commandeActuelles);
        this.commandeActuelles=commandeActuelles;
       for (let p = 0; p < this.commandeActuelles.length; p++) {
         const comActuelle = this.commandeActuelles[p];
         
         for (let j = 0; j < comActuelle.details.length; j++) {
          const detail = comActuelle.details[j];
          var caractActuelles=[];
          for (let i = 0; i < data.length; i++) {
            const caract = data[i];
            if (caract.article==detail.article) {
              caractActuelles.push(caract);
            }
            for (let k = 0; k < caractActuelles.length; k++) {
              const cActuelle = caractActuelles[k];
              if (cActuelle.couleur==detail.couleur) {
                detail.photoCom=cActuelle.photoCaract;
              }
            }
          }
        }
       }
       
       console.log("this.commandeActuelles");
       console.log(this.commandeActuelles);
       
        return this.commandeActuelles;
      },
      error=>{console.log(error);}
    )
  }

  getdetailcommande(commandeActuelles){
    this._detailCom.getAllDetailCom().subscribe(
      data=>{ 
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          const detail = data[i];
          for (let j = 0; j < commandeActuelles.length; j++) {
            const comActuelle = commandeActuelles[j];
            if (comActuelle.id==detail.commande) {
              comActuelle.details.push(detail);
            }
          }
        }

        for (let i = 0; i < commandeActuelles.length; i++) {
          const commandeActuelle = commandeActuelles[i];
          commandeActuelle.montantCmd=this.calculerMontant(commandeActuelle);

          switch (commandeActuelle.statusCmd) {

            case 'EA':
              commandeActuelle.statusCmd2="En Attente";
              break;
            case 'EC':
              commandeActuelle.statusCmd2="En Cour";
              break;
            case 'EF':
              commandeActuelle.statusCmd2="Effectué";
              break;
            case 'T':
              commandeActuelle.statusCmd2="Terminé";
              break;
          
            default:
              commandeActuelle.statusCmd2="erreur";
              break;
          }
          
        }
        console.log("commandeActuelles");
        console.log(commandeActuelles);
        this.commandeActuelles=commandeActuelles;
        
        this.commandeActuelles = this.choisirPhoto(this.commandeActuelles);
        this.trierCommandeDate(this.commandeActuelles);
      },
      error=>{console.log(error);}
    )
  }

  calculerMontant(commande){
    var montant = 0;
    for (let i = 0; i < commande.details.length; i++) {
      const detail = commande.details[i];
      montant += detail.prixCom * detail.qteCom;
    }
    return montant;
  }

  getCommandeActuelle(clientId){
    this._commande.getAllCommande().subscribe(
      data=>{
        console.log(data);
        const lesCommandes=[]
        for (let i = 0; i < data.length; i++) {
          const commande = data[i];
          if (commande.client==clientId) {
            //console.log(clientId);
            commande.details=[];
            
            lesCommandes.push(commande);
          }
        }
        if (lesCommandes.length>0) {
          this.selectedCommandeActuelle=lesCommandes[0];
        }
        console.log("affichage des commade actuelle");
        console.log(lesCommandes);
        this.getdetailcommande(lesCommandes);
        return lesCommandes;
      },
      error=>{console.log(error);}
    )
  }

  getClient=(articles)=>{
    this._client.getAllClient().subscribe(
      data=>{
        console.log(data);
        this.clients=data;
        this.getCommande(this.clients,articles)
      },
      error=>{
        console.log(error);
      }
    )
  }

  getOneClient(id,clients){
    for (let i = 0; i < clients.length; i++) {
      const val = clients[i];
      if (val.id==id) {
        return val;
      }
    }
  }

  getArticle=()=>{
    this._article.getAllArticle().subscribe(
      data=>{
        console.log(data);
        this.articles=data;
        this.getClient(this.articles);
      },
      error=>{
        console.log(error);
      }
    )
  }

  modifierCommande(){

    this.updateCommande();
    this.formVisible=false;
  }
  creerCommande(){

    console.log(this.selectedcommande)
    this.creatCommande();
    this.formVisible=false;
  }
  showFormModifier(commande){
   this.labelDuForm='Modification de la commande ';
   this.formVisible=true;
   this.modifierVisible=true;
   this.annulerVisible = true;
   this.creerVisible = false;
   this.idVisible = false;
   this.MarqueSelected(commande);
   
  }
  showFormCreer(){
    this.commandeActuelles = this.getCommandeActuelle(this.sessionActuelle.id);
    this.labelDuForm='Ajout d\'une commande ';
   this.formVisible=true;
   this.modifierVisible=false;
   this.annulerVisible = true;
   this.creerVisible = true;
   this.idVisible = false;
  }

   getCommande = (clients,articles)=>{
     this._commande.getAllCommande().subscribe(
       data=>{
         this.commandes=data;
         for (let i = 0; i < this.commandes.length; i++) {
           const val = this.commandes[i];
          this.commandes[i].articles2=this.getOneArticle(this.commandes[i].articles,articles)
           this.commandes[i].client2=this.getOneClient(this.commandes[i].client, clients)
         }
         console.log("affichage de test");
         console.log(this.commandes);
         this.trierCommandeDate(this.commandes);
       //  console.log(this.clients);
       },
       error =>{
         console.log(error);
       }
     )
   }

   trierCommandeDate(commandes){
     for (let i = 0; i < this.commandeActuelles.length - 1; i++) {
       const val = this.commandeActuelles[i];
        for (let j = i; j < this.commandeActuelles.length; j++) {
          const val2 = this.commandeActuelles[j];
          if (this.commandeActuelles[i].dateCmd < this.commandeActuelles[j].dateCmd) {
            var c = this.commandeActuelles[i];
            this.commandeActuelles[i]= this.commandeActuelles[j];
            this.commandeActuelles[j]= c;
          }
        }
     }
    // this.commandes = commandes;
     console.log(this.commandeActuelles);
   }

   getOneArticle(article_ids,articles){
     var res_articles=[];
      for (let i = 0; i < articles.length; i++) {
        const val = articles[i];
        for (let j = 0; j < article_ids.length; j++) {
          const val2 = article_ids[j];

          if (val.id==val2) {
            res_articles.push(val);
          }
        }
       
      }
      return res_articles;
   }

   MarqueSelected=(commande)=>{
     // console.log(movie.id);
      this._commande.getOneCommande(commande.id).subscribe(
        data=>{
          this.selectedcommande=data;
          console.log(this.selectedcommande);
        },
        error =>{
          console.log(error);
        }
      );
    }

    annulerModif(){
      this.selectedcommande=-1;
      this.formVisible=false;
    }
   updateCommande = ()=>{
     this._commande.updateCommande(this.selectedcommande).subscribe(
       data=>{
         this.getArticle();
       },
       error =>{
         console.log(error);
       }
     )
   }

   creatCommande = () =>{
     this._commande.createCommande(this.selectedcommande).subscribe(
       data=>{
        this.commandes.push(data);
       },
       error =>{
         console.log(error);
       }
     );
   }
   supprimerCommande(commande){
     if (confirm('êtes vous sur de vouloir suprimer cet element ?')) {
       this.deleteCommande(commande);
     }
     
   }
   deleteCommande(commande){
     this._commande.deleteCommande(commande.id).subscribe(
       data=>{
       this.getArticle();
       
       },
       error =>{
         console.log(error);
       }
     );
   }

  ngOnInit() {
  }

}
