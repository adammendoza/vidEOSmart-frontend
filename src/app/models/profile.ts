declare var $: any;

export class Profile {
  userName: string;
  firstName: string;
  lastName: string;
  entity: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  st: string;
  zip: string;
  userId: string;
  createDate: string;
  token: string;
  biography: string;

  constructor(jsonData: any) {
    $.extend(this, jsonData);
  }
}
