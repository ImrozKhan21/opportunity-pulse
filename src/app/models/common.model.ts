export interface IEnv {
  "authority": string;
  "cinchyRootUrl": string;
  "clientId": string;
  "redirectUri": string;
  "version": string;
}

export interface IChangeHistory {
  Change: string;
  DateStr: string;
  TimeStr: string;
  Id: string;
  Label: string;
  updatedDateStr: string;
}

export interface INavigation {
  icon: string;
  label: string;
  order: number;
  route: string;
}
