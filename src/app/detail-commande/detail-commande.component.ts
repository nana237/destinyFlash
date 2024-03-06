import { Component, OnInit } from '@angular/core';
import { DetailCommandeService } from '../detail-commande.service';
import { CommandeService } from '../commande.service';
import { ArticleService } from '../article.service';
import { CaracteristiqueService } from '../caracteristique.service';

@Component({
  selector: 'app-detail-commande',
  templateUrl: './detail-commande.component.html',
  styleUrls: ['./detail-commande.component.css'],
  providers: [DetailCommandeService,CommandeService,CaracteristiqueService,ArticleService]
})
export class DetailCommandeComponent implements OnInit {

  
  detailcoms; 
  selecteddetailcom;
  formVisible=false;
  modifierVisible=false;
  annulerVisible = false;
  creerVisible = false;
  idVisible = false;
  labelDuForm='';
  commandes;
  articles;

  constructor(
    private _detailCom : DetailCommandeService,
    private _commande : CommandeService,
    private _article : ArticleService,
    private _caracteristique : CaracteristiqueService
    ) { 
    console.log("salut a tous");
    this.getArticle();
  //  this.getDetailCom(this.commandes,this.articles);
    console.log("salut a tous 2");
  //  this.getCommande(this.articles);
    
    this.selecteddetailcom={
      commande:'',
      article:'',
      qteCom:0,
      couleurCom:'',
      tailleCom:'',
      prixCom:'',
      autreDetailCom:''
    }
  }

/**
   choisirPhoto(details){
    this._caracteristique.getAllCaracteristique().subscribe(
      data=>{
        console.log(data);
        for (let j = 0; j < details.length; j++) {
          const detail = details[j];
          var caractActuelles=[];
          for (let i = 0; i < data.length; i++) {
            const caract = data[i];
            if (caract.article==detail.article) {
              caractActuelles.push(caract);
            }
            for (let k = 0; k < caractActuelles.length; k++) {
              const cActuelle = caractActuelles[k];
              if (cActuelle.couleur==detail.couleur) {
                detail.photoCom=cActuelle.photo;
              }
            }
          }
        }
        console.log(details);
        return details;
      },
      error=>{console.log(error);}
    )
  }
 */
 

  modifierDetailCom(){
    console.log(this.selecteddetailcom)
    this.updateDetailCom();
    this.formVisible=false;
  }
  creerDetailCom(){
    console.log(this.selecteddetailcom)
    this.creatDetailCom();
    this.formVisible=false;
  }
  showFormModifier(detailCom){
   this.labelDuForm='Modification de la marque ';
   this.formVisible=true;
   this.modifierVisible=true;
   this.annulerVisible = true;
   this.creerVisible = false;
   this.idVisible = false;
   this.DetailComSelected(detailCom);
   
  }
  showFormCreer(){
   this.labelDuForm='Ajout d\'un Detail sur une commande ';
   this.formVisible=true;
   this.modifierVisible=false;
   this.annulerVisible = true;
   this.creerVisible = true;
   this.idVisible = false;
  }
  getArticle=()=>{
    this._article.getAllArticle().subscribe(
      data=>{
        console.log(data);
        this.articles=data;
        this.getCommande(this.articles);
      },
      error=>{
        console.log(error);
      }
    )
  }

  getOneArticle(id,articles){
    for (let i = 0; i < articles.length; i++) {
      const val = articles[i];
      if (val.id==id) {
        return val;
      }
    }
  }

  getCommande=(articles)=>{
    this._commande.getAllCommande().subscribe(
      data=>{
        console.log(data);
        this.commandes=data;
        this.getDetailCom(this.commandes,articles);
      },
      error=>{
        console.log(error);
      }
    )
  }

  getOneCommande(id,commandes){
    for (let i = 0; i < commandes.length; i++) {
      const val = commandes[i];
      if (val.id==id) {
        return val;
      }
    }
  }

   getDetailCom = (commandes,articles)=>{
     this._detailCom.getAllDetailCom().subscribe(
       data=>{
         console.log(data);
         this.detailcoms=data;

         for (let i = 0; i < this.detailcoms.length; i++) {
         
          this.detailcoms[i].commande2=this.getOneCommande(this.detailcoms[i].commande,commandes);
          this.detailcoms[i].article2=this.getOneArticle(this.detailcoms[i].article,articles);
        console.log("affichage de la commande2 " + i)
        console.log(this.detailcoms[i].commande2);
        console.log("affichage de l'article " + i)
        console.log(this.detailcoms[i].article2);

        }

       },
       error =>{
         console.log(error);
       }
     )
   }

   DetailComSelected=(marque)=>{
     // console.log(movie.id);
      this._detailCom.getOneDetailCom(marque.id).subscribe(
        data=>{
          this.selecteddetailcom=data;
          console.log(this.selecteddetailcom);
        },
        error =>{
          console.log(error);
        }
      );
    }

    annulerModif(){
      this.selecteddetailcom=-1;
      this.formVisible=false;
    }
   updateDetailCom = ()=>{
     this._detailCom.updateDetailCom(this.selecteddetailcom).subscribe(
       data=>{
         this.getArticle();
       },
       error =>{
         console.log(error);
       }
     )
   }

   creatDetailCom = () =>{
     this._detailCom.createDetailCom(this.selecteddetailcom).subscribe(
       data=>{
        this.getArticle();
       },
       error =>{
         console.log(error);
       }
     );
   }
   supprimerDetailCom(detailCom){
     if (confirm('êtes vous sur de vouloir suprimer cet element ?')) {
       this.deleteDetailCom(detailCom);
     }
     
   }
   deleteDetailCom(detailCom){
     this._detailCom.deleteDetailCom(detailCom.id).subscribe(
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
