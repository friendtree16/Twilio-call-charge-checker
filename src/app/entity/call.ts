import { CallListResponse, CallRow } from './call-list-response';
import { IncomingPhoneNumber } from './incoming-phone-number-response';

export class Call {
    phoneNumber: string;
    friendlyName: string;
    price: number = 0;
    inbountCallTime: number = 0;
    outboutCallTime: number = 0;

    constructor(incommingPhoneNumber: IncomingPhoneNumber);
    constructor(callRow: CallRow);
    constructor(row: any) {

        if (row instanceof IncomingPhoneNumber) {
            this.phoneNumber = row.phone_number;
            this.friendlyName = row.friendly_name;
        }

        if (row instanceof CallRow) {
            this.phoneNumber = row.getPhoneNumber();
            this.price = this.abs(row.price);
            let startTime = new Date(row.start_time);
            let endTime = new Date(row.end_time);

            if(row.direction == 'inbound') {
                this.inbountCallTime = endTime.getTime() - startTime.getTime();
            } else {
                this.outboutCallTime = endTime.getTime() - startTime.getTime();
            }
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

    clear() {
        this.price = 0;
        this.inbountCallTime = 0;
        this.outboutCallTime = 0;
    }

    abs(val:any) : number {
        if (isNaN(val)) {
          return 0;
        } else {
          return val <= 0 ? -val : val;
        }
      };

  }