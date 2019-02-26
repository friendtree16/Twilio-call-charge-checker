export class CallListResponse {
    calls: Array<CallRow>;
    end: number;
    first_page_uri: string;
    next_page_uri: string;
    page: number;
    page_size: number;
    previous_page_uri: string;
    start: number;
    uri: string;

    constructor(callListResponse: CallListResponse) {
      var tmpCalls : Array<CallRow> = [];
      callListResponse.calls.forEach(row => {
        tmpCalls.push(new CallRow(row));
      });
      this.calls = tmpCalls;

      this.end = callListResponse.end;
      this.first_page_uri = callListResponse.first_page_uri;
      this.next_page_uri = callListResponse.next_page_uri;
      this.page = callListResponse.page;
      this.page_size = callListResponse.page_size;
      this.previous_page_uri = callListResponse.previous_page_uri;
      this.start = callListResponse.start;
      this.uri = callListResponse.uri;
    }
  }

  export class CallRow {
    account_sid: string;
    annotation: string;
    answered_by: string;
    api_version: string;
    caller_name: string;
    date_created: string;
    date_updated: string;
    direction: string;
    duration: string;
    end_time: string;
    forwarded_from: string;
    from: string;
    from_formatted: string;
    group_sid: string;
    parent_call_sid: string;
    phone_number_sid: string;
    price: string;
    price_unit: string;
    sid: string;
    start_time: string;
    status: string;
    subresource_uris: SubresourceUris; 
    to: string;
    to_formatted: string;
    uri: string;

    constructor(callRow: CallRow) {
      this.account_sid = callRow.account_sid;
      this.annotation = callRow.annotation;
      this.answered_by = callRow.answered_by;
      this.api_version = callRow.api_version;
      this.caller_name = callRow.caller_name;
      this.date_created = callRow.date_created;
      this.date_updated = callRow.date_updated;
      this.direction = callRow.direction;
      this.duration = callRow.duration;
      this.end_time = callRow.end_time;
      this.forwarded_from = callRow.forwarded_from;
      this.from = callRow.from;
      this.from_formatted = callRow.from_formatted;
      this.group_sid = callRow.group_sid;
      this.parent_call_sid = callRow.parent_call_sid;
      this.phone_number_sid = callRow.phone_number_sid;
      this.price = callRow.price;
      this.price_unit = callRow.price_unit;
      this.sid = callRow.sid;
      this.start_time = callRow.start_time;
      this.status = callRow.status;
      this.subresource_uris = new SubresourceUris(callRow.subresource_uris); 
      this.to = callRow.to;
      this.to_formatted = callRow.to_formatted;
      this.uri = callRow.uri;
    }

    getPhoneNumber() : string {
      var phoneNumber;
      if(this.direction == 'inbound') {
        phoneNumber = this.to;
        if(phoneNumber == '') {
          phoneNumber = 'client';
        }
      } else {
        phoneNumber = this.from;
      }
      return phoneNumber;
    }
  }

  export class SubresourceUris {
    notifications: string;
    recordings: string;

    constructor(subresourceUris: SubresourceUris) {
      this.notifications = subresourceUris.notifications;
      this.recordings = subresourceUris.recordings;
    }

  }