import Dexie, { Table } from "dexie";

import { PasswordRecord } from "@/types/password";

export class Database extends Dexie {
  password!: Table<PasswordRecord>;

  constructor() {
    super("database");
    this.version(1).stores({
      password: "++id, account, password, type, desc, createTime, updateTime",
    });
  }
}

export const db = new Database();
