import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class FactureService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient) { }
  
  getAllFacture(): Observable<any>{
    return this.http.get(this.baseurl + '/factures/',
    {headers: this.httpHeaders});
  }

  getOneFacture(id): Observable<any> {
    return this.http.get(this.baseurl + '/factures/'+ id +'/',
    {headers: this.httpHeaders});
  }

  updateFacture(facture): Observable<any>{
    const body={dateF:facture.dateF, montantF:facture.montantF, commande:facture.commande};
    return this.http.put(this.baseurl + '/factures/' + facture.id + '/',body,
    {headers: this.httpHeaders}
    )
  }
  fields = ['id', '', '','']
  
    createFacture(facture): Observable<any> {
    const body={dateF:facture.dateF, montantF:facture.montantF, commande:facture.commande};
    return this.http.post(this.baseurl + '/factures/', body,
    {headers: this.httpHeaders});
  }

  deleteFacture(id): Observable<any> {
    return this.http.delete(this.baseurl + '/factures/' + id + '/',
    {headers: this.httpHeaders});
  }

}
