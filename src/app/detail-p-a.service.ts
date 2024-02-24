import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DetailPAService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient) { }

  getAllDetail(): Observable<any>{
    return this.http.get(this.baseurl + '/detail_p_as/',
    {headers: this.httpHeaders});
  }

  getOneDetail(id): Observable<any> {
    return this.http.get(this.baseurl + '/detail_p_as/'+ id +'/',
    {headers: this.httpHeaders});
  }

  updateDetail(detail): Observable<any>{
    const body={panier:detail.panier, article:detail.article, qte:detail.qte, couleur: detail.couleur, taille: detail.taille , prix: detail.prix, autreDetail: detail.autreDetail};
    return this.http.put(this.baseurl + '/detail_p_as/' + detail.id + '/',body,
    {headers: this.httpHeaders}
    )
  }

    createDetail(detail): Observable<any> {
    const body={panier:detail.panier, article:detail.article, qte:detail.qte, couleur: detail.couleur, taille: detail.taille , prix: detail.prix, autreDetail: detail.autreDetail};
    return this.http.post(this.baseurl + '/detail_p_as/', body,
    {headers: this.httpHeaders});
  }

  deleteDetail(id): Observable<any> {
    return this.http.delete(this.baseurl + '/detail_p_as/' + id + '/',
    {headers: this.httpHeaders});
  }

}
