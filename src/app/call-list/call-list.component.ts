import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Call } from '../entity/call';
import { CallListResponse, CallRow } from '../entity/call-list-response';

import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type':'application/x-www-form-urlencoded',
    'Authorization':'Basic ' + btoa(environment.sid + ':' + environment.token)
  })
};

@Component({
  selector: 'app-call-list',
  templateUrl: './call-list.component.html',
  styleUrls: ['./call-list.component.css']
})
export class CallListComponent implements OnInit {

  constructor(private http: HttpClient) { }

  calls = [];
  baseUrl = 'https://api.twilio.com/2010-04-01/Accounts/' + environment.sid;

  ngOnInit() {
    this.fetchCallHistory();
  }

  fetchCallHistory(pageUrl:string = null){
    var requestParam = '?StartTime%3E=2019-02-01&EndTime%3C=2019-02-28';
    if(pageUrl) {
      requestParam += '&nextpageuri=' + pageUrl;
    }
    let requestUrl = this.baseUrl + '/Calls.json' + requestParam;
    this.http.get<CallListResponse>(requestUrl,httpOptions)
    .pipe(
      map(response => new CallListResponse(response))
    )
    .subscribe(response => {
      response.calls.forEach(row => {
        let phoneNumber = row.getPhoneNumber() ;

        let targetCall = this.calls.filter(function(element, index, array) {
          return element.phoneNumber == phoneNumber;
        });

        if (targetCall.length == 0) {
          // 新しい電話番号
          let tmpCall = new Call(row);
          this.calls.push(tmpCall);
        } else {
          // 重複ありの電話番号
          let tmpCall:Call = targetCall[0];
          tmpCall.marge(row);
        }
      });
      console.log(this.calls);
      if(response.next_page_uri) {
        this.fetchCallHistory(response.next_page_uri);
      }
    });
  }
}
