import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type':'application/json'})


  constructor(private http: HttpClient) { }

  getAllPanier(): Observable<any>{
    return this.http.get(this.baseurl + '/paniers/',
    {headers: this.httpHeaders});
  }

  getOnePanier(id): Observable<any> {
    return this.http.get(this.baseurl + '/paniers/'+ id +'/',
    {headers: this.httpHeaders});
  }

  updatePanier(panier): Observable<any>{
    const body={libPanier:panier.libPanier, client:panier.client, articles: panier.articles};
    return this.http.put(this.baseurl + '/paniers/' + panier.id + '/',body,
    {headers: this.httpHeaders}
    )
  }
  
    createPanier(panier): Observable<any> {
    const body={libPanier:panier.libPanier, client:panier.client, articles: panier.articles};
    return this.http.post(this.baseurl + '/paniers/', body,
    {headers: this.httpHeaders});
  }

  deletePanier(id): Observable<any> {
    return this.http.delete(this.baseurl + '/paniers/' + id + '/',
    {headers: this.httpHeaders});
  }

}
