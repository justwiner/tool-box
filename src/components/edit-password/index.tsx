import { ProForm } from "@ant-design/pro-components";
import { Modal } from "antd";
import { useCallback, useEffect, useState } from "react";

import PasswordForm from "@/components/add-password/PasswordForm";
import { AddPasswordParams, updatePassword } from "@/server/password";
import { PasswordRecord } from "@/types/password";

interface AddPasswordProps {
  editSuccess?: () => void;
  data?: PasswordRecord;
}

export default function AddPassword(props: AddPasswordProps) {
  const [visible, setVisible] = useState(false);
  const [form] = ProForm.useForm<AddPasswordParams>();

  useEffect(() => {
    form.setFieldsValue({
      account: props.data?.account,
      password: props.data?.password,
      type: props.data?.type,
      desc: props.data?.desc,
    });
  }, [form, props.data]);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  const handleOk = useCallback(async () => {
    if (!props.data) return;
    const data = await form.validateFields();
    await updatePassword({
      ...props.data,
      ...data,
    });
    props.editSuccess?.();
    form.resetFields();
    setVisible(false);
  }, [form, props]);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a onClick={() => setVisible(true)}>编辑</a>
      <Modal title="编辑密码对" onCancel={handleClose} visible={visible} onOk={handleOk}>
        <ProForm<AddPasswordParams> form={form} submitter={false} grid layout="horizontal">
          <PasswordForm />
        </ProForm>
      </Modal>
    </>
  );
}
