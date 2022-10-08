import { RequestData } from "@ant-design/pro-components";
import { SortOrder } from "antd/lib/table/interface";
import { ReactText } from "react";

export type TableRequest<T> = (
  params: any,
  sort: Record<string, SortOrder>,
  filter: Record<string, ReactText[] | null>
) => Promise<Partial<RequestData<T>>>;
