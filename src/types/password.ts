export enum PASSWORD_TYPE {
  APP = "APP",
  WEB = "WEB",
}

export interface PasswordRecord {
  id?: number;
  account: string;
  password: string;
  type: PASSWORD_TYPE;
  desc: string;
  createTime: number;
  updateTime: number;
}
