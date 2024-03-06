import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient) { }

  getAllClient(): Observable<any>{

    return this.http.get(this.baseurl + '/clients/',
    {headers: this.httpHeaders});
  }

  getOneClient(id): Observable<any> {
    return this.http.get(this.baseurl + '/clients/'+ id +'/',
    {headers: this.httpHeaders});
  }

  updateClient(client): Observable<any>{
    const body={nomC:client.nomC, prenomC:client.prenomC, dateNaissC:client.dateNaissC, emailC: client.emailC, sexeC: client.sexeC, adresseC: client.adresseC,villeC: client.villeC,quartierC: client.quartierC, numCNI_C: client.numCNI_C, telC: client.telC, loginC: client.loginC, motDePassC: client.motDePassC};
    return this.http.put(this.baseurl + '/clients/' + client.id + '/',body,
    {headers: this.httpHeaders}
    )
  }
  


    createClient(client): Observable<any> {
    const body={nomC:client.nomC, prenomC:client.prenomC, dateNaissC:client.dateNaissC, emailC: client.emailC, sexeC: client.sexeC, adresseC: client.adresseC,villeC: client.villeC,quartierC: client.quartierC, numCNI_C: client.numCNI_C, telC: client.telC, loginC: client.loginC, motDePassC: client.motDePassC};
    return this.http.post(this.baseurl + '/clients/', body,
    {headers: this.httpHeaders});
  }

  deleteClient(id): Observable<any> {
    return this.http.delete(this.baseurl + '/clients/' + id + '/',
    {headers: this.httpHeaders});
  }

}
