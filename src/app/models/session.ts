declare var $: any;

export class Session {
  user_name: string;
  session_id: string;
  is_technical_user: string;
  user_id: string;
  conf: Array<string>;
  version: string;

  constructor(jsonData: any) {
    $.extend(this, jsonData);
  }
}
