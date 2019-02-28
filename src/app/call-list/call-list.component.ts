import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Call } from '../entity/call';
import { CallListResponse, CallRow } from '../entity/call-list-response';

import { map } from 'rxjs/operators';
import { IncomingPhoneNumberResponse } from '../entity/incoming-phone-number-response';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-call-list',
  templateUrl: './call-list.component.html',
  styleUrls: ['./call-list.component.css']
})
export class CallListComponent implements OnInit {

  constructor(private http: HttpClient, private loginService:LoginService) { }

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type':'application/x-www-form-urlencoded',
      'Authorization':'Basic ' + btoa(this.loginService.getAccountSid() + ':' + this.loginService.getAccessToken())
    })
  };

  baseUrl = 'https://api.twilio.com/2010-04-01/Accounts/' + this.loginService.getAccountSid();

  calls: Array<Call> = [];

  years = [];
  selectedYear: string;

  months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  selectedMonth: string;

  ngOnInit() {
    var now = new Date();
    this.selectedYear  = now.getFullYear().toString();
    // 2年前まで確認できる
    for(var previousCount =0 ; previousCount <= 2; previousCount++) {
      let tmpYear = now.getFullYear() - previousCount;
      this.years.push(tmpYear);
    }
    this.years.push();
    this.selectedMonth = this.zeroPadding(now.getMonth() + 1 ,2);    //月
    this.fetchPhoneNumber();
  }

  // click event
  onClickMonth(month) {
    this.selectedMonth = month;
    this.clearCalls();
    this.fetchCallHistory(this.createStartTime(this.selectedYear,this.selectedMonth),this.createEndTime(this.selectedYear,this.selectedMonth));
  }

  onClickYear(year) {
    this.selectedYear = year;
    this.clearCalls();
    this.fetchCallHistory(this.createStartTime(this.selectedYear,this.selectedMonth),this.createEndTime(this.selectedYear,this.selectedMonth));
  }

  onClickReload() {
    this.clearCalls();
    this.fetchCallHistory(this.createStartTime(this.selectedYear,this.selectedMonth),this.createEndTime(this.selectedYear,this.selectedMonth));
  }

  clearCalls() {
    this.calls.forEach(row => row.clear());
  }

  fetchPhoneNumber(pageUrl:string = null) {
    let requestUrl = this.baseUrl + '/IncomingPhoneNumbers.json';
    if(pageUrl) {
      requestUrl += '&nextpageuri=' + pageUrl;
    }
    this.http.get<IncomingPhoneNumberResponse>(requestUrl,this.httpOptions)
    .pipe(
      map(respose => new IncomingPhoneNumberResponse(respose))
    )
    .subscribe(response => {
      response.incoming_phone_numbers.forEach(row => {
        this.calls.push(new Call(row));
      });
      
      if(response.next_page_uri) {
        this.fetchPhoneNumber(response.next_page_uri);
      } else {
        this.fetchCallHistory(this.createStartTime(this.selectedYear,this.selectedMonth),this.createEndTime(this.selectedYear,this.selectedMonth));
      }
    });
  }

  fetchCallHistory(startTime: string, endTime: string, pageUrl:string = null){
    var requestParam = '?StartTime%3E=' + startTime + '&EndTime%3C=' + endTime;
    if(pageUrl) {
      requestParam += '&nextpageuri=' + pageUrl;
    }
    let requestUrl = this.baseUrl + '/Calls.json' + requestParam;
    this.http.get<CallListResponse>(requestUrl, this.httpOptions)
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
      if(response.next_page_uri) {
        this.fetchCallHistory(startTime, endTime, response.next_page_uri);
      }
    });
  }

  zeroPadding(num,length){
    return ('0000000000' + num).slice(-length);
  }

  createStartTime(year, month): string {
    return year + '-' + month + '-01';
  }

  createEndTime(year, month): string {
    let nextMonth = month + 1;
    return year + '-' + nextMonth + '-' + '-01';
  }

}
