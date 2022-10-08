import { PlusOutlined } from "@ant-design/icons";
import { ProForm } from "@ant-design/pro-components";
import { Button, Modal } from "antd";
import { useCallback, useState } from "react";

import { addPassword, AddPasswordParams } from "@/server/password";

import PasswordForm from "./PasswordForm";

interface AddPasswordProps {
  addSuccess?: () => void;
}

export default function AddPassword(props: AddPasswordProps) {
  const [visible, setVisible] = useState(false);
  const [form] = ProForm.useForm<AddPasswordParams>();

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  const handleOk = useCallback(async () => {
    const data = await form.validateFields();
    await addPassword(data);
    props.addSuccess?.();
    form.resetFields();
    setVisible(false);
  }, [form, props]);

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        <PlusOutlined />
        新建
      </Button>
      <Modal title="新建密码对" onCancel={handleClose} visible={visible} onOk={handleOk}>
        <ProForm<AddPasswordParams> form={form} submitter={false} grid layout="horizontal">
          <PasswordForm />
        </ProForm>
      </Modal>
    </>
  );
}
