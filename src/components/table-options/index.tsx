import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import { PropsWithChildren } from "react";

const MAX_CONTENT = 3;

export default function TableOptions(props: PropsWithChildren) {
  if (props.children instanceof Array) {
    const length = props.children?.length;
    if (length > MAX_CONTENT) {
      const extraOptions = [...props.children].splice(MAX_CONTENT - 1);
      return (
        <Space>
          {props.children[0]}
          {props.children[1]}
          <Dropdown
            overlay={
              <Menu
                items={extraOptions.map((e, index) => ({
                  key: index,
                  label: e,
                }))}
              />
            }
          >
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a onClick={e => e.preventDefault()}>
              <Space>
                更多
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Space>
      );
    }
  }
  return <Space>{props.children}</Space>;
}
