export interface IEnv {
  "authority": string;
  "cinchyRootUrl": string;
  "clientId": string;
  "redirectUri": string;
  "version": string;
}

export interface IChangeHistory {
  pulseDesc: string;
  dateStr: string;
  timeStr: string;
  id: string;
  pulseHeader: string;
  updatedDateStr: string;
  isToday: string;
  dealType: string;
  pulseType: string;
  companyLogo: string;
  icon: string;
  account: string;
  buttonLabel: string;
  openDate: string;
  owner: string;
  ownerTitle: string;
  ownerImage: string;
  previousValue: string;
  value: string;
  version: string;
}

export interface INavigation {
  icon: string;
  label: string;
  order: number;
  route: string;
}

export interface IFilter {
  label: string;
  id: string;
  order: number;
  checked: boolean;
  section: string;
  value: string;
}

export interface ISalesperson {
  person: string;
  photo: string;
  position: string;
  ownerId: string;
}

export interface IException {
  companyLabel: string;
  companyLogo: string;
  error: string;
  person: string;
  photo: string;
  text: string;
  url: string;
}


export const PulseTypeImageMap: any = {
  'EST/ACT CLOSE DATE CHANGE': 'est_close_date',
  'STATUS CHANGE': 'status_change',
  'NEW OPPORTUNITY': 'new_opportunity',
  'ARR CHANGE': 'arr_change',
  'EST ONE-TIME REVENUE CHANGE': 'one_time_revenue'
}


export const PayloadMap = {
  'Opp Type': 'typeId',
  'Pulse Type': 'pulseId'
}


export interface IOpportunity {
  pulseHeader: string;
  version: string;
  pulseDesc: string;
  companyLogo: string;
  icon: string;
  dateStr: string;
  timeStr: string;
  owner: string;
  id: string;
}
