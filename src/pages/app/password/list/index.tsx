import { ActionType, PageContainer, ProColumns, ProTable } from "@ant-design/pro-components";
import { Popconfirm } from "antd";
import { useCallback, useMemo, useRef } from "react";

import AddPassword from "@/components/add-password";
import EditPassword from "@/components/edit-password";
import TableOptions from "@/components/table-options";
import { deletePassword, getPasswordList } from "@/server/password";
import { TableRequest } from "@/types";
import { PASSWORD_TYPE, PasswordRecord } from "@/types/password";

export default function List() {
  const tableRef = useRef<ActionType>();

  const handleDelete = useCallback(async (record: PasswordRecord) => {
    if (!record.id) return;
    await deletePassword(record.id);
    tableRef.current?.reload();
  }, []);

  const columns = useMemo<ProColumns<PasswordRecord>[]>(() => {
    return [
      {
        title: "平台",
        dataIndex: "type",
        width: 80,
        valueEnum: {
          [PASSWORD_TYPE.APP]: {
            text: "APP",
          },
          [PASSWORD_TYPE.WEB]: {
            text: "浏览器",
          },
        },
      },
      {
        title: "账号",
        dataIndex: "account",
        search: false,
        width: 120,
        copyable: true,
      },
      {
        title: "密码",
        dataIndex: "password",
        search: false,
        copyable: true,
        valueType: "password",
        width: 160,
      },
      {
        title: "描述",
        dataIndex: "desc",
        ellipsis: true,
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        valueType: "dateTime",
        hideInSearch: true,
        width: 160,
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        valueType: "dateRange",
        hideInTable: true,
        search: {
          transform: value => {
            return {
              startTime: value[0],
              endTime: value[1],
            };
          },
        },
      },
      {
        title: "更新时间",
        dataIndex: "updateTime",
        valueType: "dateTime",
        hideInSearch: true,
        width: 160,
      },
      {
        title: "操作",
        width: 150,
        search: false,
        render: (_, record) => {
          return (
            <TableOptions>
              <EditPassword editSuccess={() => tableRef.current?.reload()} data={record} />
              <Popconfirm title="是否删除此密码?" onConfirm={() => handleDelete(record)} okText="是" cancelText="否">
                <a>删除</a>
              </Popconfirm>
            </TableOptions>
          );
        },
      },
    ];
  }, [handleDelete]);

  const requestPasswordList = useCallback<TableRequest<PasswordRecord>>(async params => {
    const res = await getPasswordList(params);
    return {
      data: res.data,
      success: true,
      total: res.total,
    };
  }, []);

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        actionRef={tableRef}
        headerTitle={<AddPassword addSuccess={() => tableRef.current?.reload()} key="add" />}
        request={requestPasswordList}
        columns={columns}
        pagination={{ pageSize: 10 }}
      />
    </PageContainer>
  );
}
