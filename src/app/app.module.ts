import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { RouterModule,Routes } from '@angular/router';
import { DatePipe } from '@angular/common';
// import { SlickCarouselModule } from 'ngx-slick-carousel';
// import { StickyNavModule } from 'ng2-sticky-nav';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// import {main} from '../app/design/js/main';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccueilComponent } from './accueil/accueil.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import { PointDeRetraitComponent } from './point-de-retrait/point-de-retrait.component';
import { ArticleComponent } from './article/article.component';
import { SousCategorieComponent } from './sous-categorie/sous-categorie.component';
import { CategorieComponent } from './categorie/categorie.component';
import { MarqueComponent } from './marque/marque.component';
import { PanierComponent } from './panier/panier.component';
import { ClientComponent } from './client/client.component';
import { SeConnecterComponent } from './se-connecter/se-connecter.component';
import { DetailPAComponent } from './detail-p-a/detail-p-a.component';
import { CaracteristiqueComponent } from './caracteristique/caracteristique.component';
import { CommandeComponent } from './commande/commande.component';
import { DetailCommandeComponent } from './detail-commande/detail-commande.component';
import { LivreurComponent } from './livreur/livreur.component';
import { LivraisonComponent } from './livraison/livraison.component';
import { FactureComponent } from './facture/facture.component';
import { AgentDestinyComponent } from './agent-destiny/agent-destiny.component';
import { PrestataireComponent } from './prestataire/prestataire.component';
import { FooterComponent } from './footer/footer.component';
import {MatDialogModule} from '@angular/material/dialog';
import { InscriptionComponent } from './inscription/inscription.component';

const routes:Routes=[
  {path:"",component:AccueilComponent},
  {path:"accueil", component:AccueilComponent},
  {path:"PointDeRetrait", component:PointDeRetraitComponent},
  {path:"article", component:ArticleComponent},
  {path:"sous_categorie", component:SousCategorieComponent},
  {path:"categorie", component:CategorieComponent},
  {path:"marque", component:MarqueComponent},
  {path:"panier", component:PanierComponent},
  {path:"client", component:ClientComponent},
  {path:"seConnecter", component:SeConnecterComponent},
  {path:"detail_P_A", component:DetailPAComponent},
  {path:"caracteristique", component:CaracteristiqueComponent},
  {path:"commande", component:CommandeComponent},
  {path:"detailCommande", component:DetailCommandeComponent},
  {path:"livreur", component:LivreurComponent},
  {path:"livraison", component:LivraisonComponent},
  {path:"facture", component:FactureComponent},
  {path:"agentDestiny", component:AgentDestinyComponent},
  {path:"prestataire", component:PrestataireComponent},
  {path:"inscription", component:InscriptionComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    NavComponent,
    PointDeRetraitComponent,
    ArticleComponent,
    SousCategorieComponent,
    CategorieComponent,
    MarqueComponent,
    PanierComponent,
    ClientComponent,
    SeConnecterComponent,
    DetailPAComponent,
    CaracteristiqueComponent,
    CommandeComponent,
    DetailCommandeComponent,
    LivreurComponent,
    LivraisonComponent,
    FactureComponent,
    AgentDestinyComponent,
    PrestataireComponent,
    FooterComponent,
    InscriptionComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
  //  SlickCarouselModule,
  //  StickyNavModule,
  // NgbModule,
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents : [PointDeRetraitComponent]
})
export class AppModule { }
