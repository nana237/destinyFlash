import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type':'application/json'})


  constructor(private http: HttpClient) { }

  getAllCommande(): Observable<any>{
    return this.http.get(this.baseurl + '/commandes/',
    {headers: this.httpHeaders});
  }

  getOneCommande(id): Observable<any> {
    return this.http.get(this.baseurl + '/commandes/'+ id +'/',
    {headers: this.httpHeaders});
  }

  updateCommande(commande): Observable<any>{
    //const body={libCmd:commande.libCmd, dateCmd:commande.dateCmd, statusCmd: commande.statusCmd, descriptionCmd: commande.descriptionCmd , montantLivraisonCmd: commande.montantLivraisonCmd, client: commande.client , articles: commande.articles, caracteristiques: commande.caracteristiques};
    const body={libCmd:commande.libCmd, dateCmd:commande.dateCmd, statusCmd: commande.statusCmd, descriptionCmd: commande.descriptionCmd , montantLivraisonCmd: commande.montantLivraisonCmd, client: commande.client , articles: commande.articles};
    return this.http.put(this.baseurl + '/commandes/' + commande.id + '/',body,
    {headers: this.httpHeaders}
    )
  }

  
    createCommande(commande): Observable<any> {
    //const body={libCmd:commande.libCmd, dateCmd:commande.dateCmd, statusCmd: commande.statusCmd, descriptionCmd: commande.descriptionCmd , montantLivraisonCmd: commande.montantLivraisonCmd, client: commande.client , articles: commande.articles, caracteristiques: commande.caracteristiques};
    const body={libCmd:commande.libCmd, dateCmd:commande.dateCmd, statusCmd: commande.statusCmd, descriptionCmd: commande.descriptionCmd , montantLivraisonCmd: commande.montantLivraisonCmd, client: commande.client , articles: commande.articles};
    return this.http.post(this.baseurl + '/commandes/', body,
    {headers: this.httpHeaders});
  }

  deleteCommande(id): Observable<any> {
    return this.http.delete(this.baseurl + '/commandes/' + id + '/',
    {headers: this.httpHeaders});
  }

}
