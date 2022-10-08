import dayjs from "dayjs";

import { db } from "@/db";
import { PasswordRecord } from "@/types/password";

export function getPasswordList(params: {
  desc?: AddPasswordParams["desc"];
  type?: AddPasswordParams["type"];
  startTime?: string;
  endTime?: string;
  current: number;
  pageSize: number;
}) {
  return db.password
    .filter(item => {
      return (
        item.desc.includes(params?.desc || "") &&
        (params?.type ? item.type === params?.type : true) &&
        (params?.startTime ? dayjs(item.createTime).isAfter(params?.startTime) : true) &&
        (params?.endTime ? dayjs(item.createTime).isBefore(params?.endTime) : true)
      );
    })
    .toArray()
    .then(list => {
      const total = list.length;
      return {
        data: list.splice((params?.current - 1) * params.pageSize, params.pageSize),
        total,
      };
    });
}

export type AddPasswordParams = Pick<PasswordRecord, "account" | "password" | "type" | "desc">;

export function addPassword(params: AddPasswordParams) {
  return db.password.add({
    ...params,
    createTime: new Date().getTime(),
    updateTime: new Date().getTime(),
  });
}

export function deletePassword(id: number) {
  return db.password.where("id").equals(id).delete();
}

export function updatePassword(params: PasswordRecord) {
  const { id, ...data } = params;
  if (!id) return;
  return db.password.update(id, {
    ...data,
    updateTime: new Date().getTime(),
  });
}
