export class IncomingPhoneNumberResponse {
    first_page_uri: string;
    end: number;
    previous_page_uri: string;
    incoming_phone_numbers: Array<IncomingPhoneNumber>;
    uri: string;
    page_size: number;
    start: number;
    next_page_uri: string;
    page: number;

    constructor(incomingPhoneNumberResponse: IncomingPhoneNumberResponse) {
      this.first_page_uri = incomingPhoneNumberResponse.first_page_uri;
      this.end = incomingPhoneNumberResponse.end;
      this.previous_page_uri = incomingPhoneNumberResponse.previous_page_uri;
      var tmpIncomingPhoneNumbers: Array<IncomingPhoneNumber> = [];
      incomingPhoneNumberResponse.incoming_phone_numbers.forEach(row => {
        tmpIncomingPhoneNumbers.push(new IncomingPhoneNumber(row));
      });
      this.incoming_phone_numbers = tmpIncomingPhoneNumbers;
      this.uri = incomingPhoneNumberResponse.uri;
      this.page_size = incomingPhoneNumberResponse.page_size;
      this.start = incomingPhoneNumberResponse.start;
      this.next_page_uri = incomingPhoneNumberResponse.next_page_uri;
      this.page = incomingPhoneNumberResponse.page;
    }
  }

  export class IncomingPhoneNumber {
      sid: string;
      account_sid: string;
      friendly_name: string;
      phone_number: string;
      voice_url: string;
      voice_method: string;
      voice_fallback_url: string;
      voice_fallback_method: string;
      voice_caller_id_lookup: boolean;
      date_created: string;
      date_updated: string;
      sms_url: string;
      sms_method: string;
      sms_fallback_url: string;
      sms_fallback_method: string;
      address_requirements: string;
      beta: boolean;
      capabilities: Capability;
      voice_receive_mode: string;
      status_callback: string;
      status_callback_method: string;
      api_version: string;
      voice_application_sid: string;
      sms_application_sid: string;
      origin: string;
      trunk_sid: string;
      emergency_status: string;
      emergency_address_sid: string;
      address_sid: string
      identity_sid: string;
      uri: string;
      status: string;

      constructor(incomingPhoneNumber: IncomingPhoneNumber) {
        this.sid = incomingPhoneNumber.sid;
        this.account_sid = incomingPhoneNumber.account_sid;
        this.friendly_name = incomingPhoneNumber.friendly_name;
        this.phone_number = incomingPhoneNumber.phone_number;
        this.voice_url = incomingPhoneNumber.voice_url;
        this.voice_method = incomingPhoneNumber.voice_method;
        this.voice_fallback_url = incomingPhoneNumber.voice_fallback_url;
        this.voice_fallback_method = incomingPhoneNumber.voice_fallback_method;
        this.voice_caller_id_lookup = incomingPhoneNumber.voice_caller_id_lookup;
        this.date_created = incomingPhoneNumber.date_created;
        this.date_updated = incomingPhoneNumber.date_updated;
        this.sms_url = incomingPhoneNumber.sms_url;
        this.sms_method = incomingPhoneNumber.sms_method;
        this.sms_fallback_url = incomingPhoneNumber.sms_fallback_url;
        this.sms_fallback_method = incomingPhoneNumber.sms_fallback_method;
        this.address_requirements = incomingPhoneNumber.address_requirements;
        this.beta = incomingPhoneNumber.beta;
        this.capabilities = incomingPhoneNumber.capabilities;
        this.voice_receive_mode = incomingPhoneNumber.voice_receive_mode;
        this.status_callback = incomingPhoneNumber.status_callback;
        this.status_callback_method = incomingPhoneNumber.status_callback_method;
        this.api_version = incomingPhoneNumber.api_version;
        this.voice_application_sid = incomingPhoneNumber.voice_application_sid;
        this.sms_application_sid = incomingPhoneNumber.sms_application_sid;
        this.origin = incomingPhoneNumber.origin;
        this.trunk_sid = incomingPhoneNumber.trunk_sid;
        this.emergency_status = incomingPhoneNumber.emergency_status;
        this.emergency_address_sid = incomingPhoneNumber.emergency_address_sid;
        this.address_sid = incomingPhoneNumber.address_sid;
        this.identity_sid = incomingPhoneNumber.identity_sid;
        this.uri = incomingPhoneNumber.uri;
        this.status = incomingPhoneNumber.status;
      }

  }

  export class Capability {
    voice: boolean;
    sms: boolean;
    mms: boolean;
    fax: boolean;

    constructor(capability: Capability) {
      this.voice = capability.voice;
      this.sms = capability.sms;
      this.mms = capability.mms;
      this.fax = capability.fax;
    }

  }