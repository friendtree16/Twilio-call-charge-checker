import { CallListResponse, CallRow } from './call-list-response';

export class Call {
    phoneNumber: string;
    friendlyName: string;
    price: number = 0;
    inbountCallTime: number = 0;
    outboutCallTime: number = 0;

    constructor(callRow: CallRow) {
        this.phoneNumber = callRow.getPhoneNumber();
        this.price = this.abs(callRow.price);
        let startTime = new Date(callRow.start_time);
        let endTime = new Date(callRow.end_time);

        if(callRow.direction == 'inbound') {
            this.inbountCallTime = endTime.getTime() - startTime.getTime();
        } else {
            this.outboutCallTime = endTime.getTime() - startTime.getTime();
        }
    }

    marge(callRow: CallRow) {
        this.price = this.abs(this.price) + this.abs(callRow.price);

        let startTime = new Date(callRow.start_time);
        let endTime = new Date(callRow.end_time);

        if(callRow.direction == 'inbound') {
        this.inbountCallTime = this.inbountCallTime + (endTime.getTime() - startTime.getTime());
        } else {
        this.outboutCallTime = this.outboutCallTime + (endTime.getTime() - startTime.getTime());
        }
    }

    abs(val:any) : number {
        if (isNaN(val)) {
          return 0;
        } else {
          return val <= 0 ? -val : val;
        }
      };

  }