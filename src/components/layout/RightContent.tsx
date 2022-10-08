import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

export default function RightContent() {
  return (
    <div>
      <Avatar shape="square" size="small" icon={<UserOutlined />} />
    </div>
  );
}
