import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class DetailCommandeService {
  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient) { }
  
  getAllDetailCom(): Observable<any>{
    return this.http.get(this.baseurl + '/detcoms/',
    {headers: this.httpHeaders});
  }

  getOneDetailCom(id): Observable<any> {
    return this.http.get(this.baseurl + '/detcoms/'+ id +'/',
    {headers: this.httpHeaders});
  }

  updateDetailCom(detailCom): Observable<any>{
    const body={commande:detailCom.commande, article:detailCom.article, qteCom: detailCom.qteCom, couleurCom: detailCom.couleurCom, tailleCom: detailCom.tailleCom , prixCom: detailCom.prixCom , autreDetailCom: detailCom.autreDetailCom};
    return this.http.put(this.baseurl + '/detcoms/' + detailCom.id + '/',body,
    {headers: this.httpHeaders}
    )
  }
  
    createDetailCom(detailCom): Observable<any> {
    const body={commande:detailCom.commande, article:detailCom.article, qteCom: detailCom.qteCom, couleurCom: detailCom.couleurCom, tailleCom: detailCom.tailleCom , prixCom: detailCom.prixCom , autreDetailCom: detailCom.autreDetailCom};
    return this.http.post(this.baseurl + '/detcoms/', body,
    {headers: this.httpHeaders});
  }

  deleteDetailCom(id): Observable<any> {
    return this.http.delete(this.baseurl + '/detcoms/' + id + '/',
    {headers: this.httpHeaders});
  }

}
