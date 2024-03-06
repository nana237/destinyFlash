import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AgentDestinyService {
  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient) { }

  getAllAgentDestiny(): Observable<any>{

    return this.http.get(this.baseurl + '/agent_destinys/',
    {headers: this.httpHeaders});
  }

  getOneAgentDestiny(id): Observable<any> {
    return this.http.get(this.baseurl + '/agent_destinys/'+ id +'/',
    {headers: this.httpHeaders});
  }

  updateAgentDestiny(agentD): Observable<any>{
    const body={nomA:agentD.nomA, prenomA:agentD.prenomA, dateNaissA:agentD.dateNaissA, emailA: agentD.emailA, sexeA: agentD.sexeA, adresseA: agentD.adresseA,villeA: agentD.villeA,quartierA: agentD.quartierA, numCNI_A: agentD.numCNI_A, telA: agentD.telA, loginA: agentD.loginA, motDePassA: agentD.motDePassA};
    return this.http.put(this.baseurl + '/agent_destinys/' + agentD.id + '/',body,
    {headers: this.httpHeaders}
    )
  }
  


    createAgentDestiny(agentD): Observable<any> {
    const body={nomA:agentD.nomA, prenomA:agentD.prenomA, dateNaissA:agentD.dateNaissA, emailA: agentD.emailA, sexeA: agentD.sexeA, adresseA: agentD.adresseA,villeA: agentD.villeA,quartierA: agentD.quartierA, numCNI_A: agentD.numCNI_A, telA: agentD.telA, loginA: agentD.loginA, motDePassA: agentD.motDePassA};
    return this.http.post(this.baseurl + '/agent_destinys/', body,
    {headers: this.httpHeaders});
  }

  deleteAgentDestiny(id): Observable<any> {
    return this.http.delete(this.baseurl + '/agent_destinys/' + id + '/',
    {headers: this.httpHeaders});
  }

}
