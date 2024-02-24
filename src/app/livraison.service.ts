import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LivraisonService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type':'application/json'})


  constructor(private http: HttpClient) { }

  getAllLivraison(): Observable<any>{
    return this.http.get(this.baseurl + '/livraisons/',
    {headers: this.httpHeaders});
  }

  getOneLivraison(id): Observable<any> {
    return this.http.get(this.baseurl + '/livraisons/'+ id +'/',
    {headers: this.httpHeaders});
  }

  updateLivraison(livraison): Observable<any>{
    const body={libeleL:livraison.libeleL, dateL:livraison.dateL, descriptionL: livraison.descriptionL , montantL: livraison.montantL, typeL: livraison.typeL, client: livraison.client , point_de_retrait: livraison.point_de_retrait, livreur: livraison.livreur , commande: livraison.commande};
    return this.http.put(this.baseurl + '/livraisons/' + livraison.id + '/',body,
    {headers: this.httpHeaders}
    )
  }
  
    createLivraison(livraison): Observable<any> {
    const body={libeleL:livraison.libeleL, dateL:livraison.dateL, descriptionL: livraison.descriptionL , montantL: livraison.montantL, typeL: livraison.typeL, client: livraison.client , point_de_retrait: livraison.point_de_retrait, livreur: livraison.livreur , commande: livraison.commande};
    return this.http.post(this.baseurl + '/livraisons/', body,
    {headers: this.httpHeaders});
  }

  deleteLivraison(id): Observable<any> {
    return this.http.delete(this.baseurl + '/livraisons/' + id + '/',
    {headers: this.httpHeaders});
  }

}
