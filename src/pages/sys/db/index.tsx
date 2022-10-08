import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { Button, Descriptions, Space, Upload } from "antd";
import { useCallback } from "react";

import { Database, db } from "@/db";

const Tables = ["password"];

export default function DBManage() {
  const exportTableData = useCallback(async (tableKey: typeof Tables[number]) => {
    const list = await (db[tableKey as unknown as keyof Database] as any).toArray();
    return {
      [tableKey]: list,
    };
  }, []);

  const exportAllData = useCallback(async () => {
    let result = {};
    for (let key of Tables) {
      result = {
        ...result,
        ...(await exportTableData(key)),
      };
    }
    return result;
  }, [exportTableData]);

  const exportFile = useCallback(async (json: Record<string, any>) => {
    const blobData = new Blob([JSON.stringify(json)]);
    const a = document.createElement("a");
    const url = window.URL.createObjectURL(blobData);
    const filename = `${new Date().getTime()}.json`;
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }, []);

  const importData = useCallback((data: Record<string, any>) => {
    for (let key in data) {
      if (Tables.includes(key)) {
        (db[key as unknown as keyof Database] as any).bulkAdd(data[key]);
      }
    }
  }, []);

  const beforeUpload = useCallback(
    (file: File) => {
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = context => {
        const result = JSON.parse(context.target?.result?.toString() || "{}");
        importData(result);
      };
    },
    [importData]
  );

  return (
    <PageContainer>
      <ProCard>
        <Space direction="vertical">
          <Descriptions title="应用数据" column={1}>
            <Descriptions.Item label="密码管理器">
              <Space>
                <a
                  onClick={async () => {
                    exportFile(await exportTableData("password"));
                  }}
                >
                  导出
                </a>
                <Upload showUploadList={false} action="" beforeUpload={beforeUpload}>
                  <a>导入</a>
                </Upload>
              </Space>
            </Descriptions.Item>
          </Descriptions>
          <Space>
            <Button
              icon={<DownloadOutlined />}
              onClick={async () => {
                exportFile(await exportAllData());
              }}
            >
              导出全部数据
            </Button>
            <Upload showUploadList={false} action="" beforeUpload={beforeUpload}>
              <Button type="primary" icon={<UploadOutlined />}>
                导入全部数据
              </Button>
            </Upload>
          </Space>
        </Space>
      </ProCard>
    </PageContainer>
  );
}
