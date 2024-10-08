// SPDX-License-Identifier: GPL-3.0
//
// Copyright (c) 2024 LINBIT
//
// Author: Liang Li <liang.li@linbit.com>

import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';

import changePassword from '@app/assets/changepassword.svg';
import changePasswordBG from '@app/assets/changepassword-bg.svg';
import { BGImg, Content, ImgIcon, MainSection } from './styled';
import { Dispatch } from '@app/store';
import { useDispatch } from 'react-redux';
import { USER_LOCAL_STORAGE_KEY } from '@app/const/settings';

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface ChangePasswordFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  admin?: boolean;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ open, onCreate, onCancel, admin }) => {
  const [form] = Form.useForm();
  return (
    <Modal open={open} wrapClassName="change-password-modal" footer={null} width="70%" onCancel={onCancel}>
      <Content>
        <BGImg src={changePasswordBG} alt="changePassword" />

        <MainSection>
          <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            initialValues={{ modifier: 'public' }}
            style={{ width: 500 }}
            onFinish={onCreate}
          >
            <h3> {admin ? 'Reset Password' : 'Change Password'} </h3>
            {!admin && (
              <Form.Item
                name="currentPassword"
                label="Current Password"
                rules={[{ required: true, message: 'Please input current password!' }]}
              >
                <Input.Password />
              </Form.Item>
            )}
            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[{ required: true, message: 'Please input new password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              rules={[{ required: true, message: 'Please input new password again!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </MainSection>
      </Content>
    </Modal>
  );
};

type ChangePasswordProps = {
  admin?: boolean;
  user?: string;
  disabled?: boolean;
};

const ChangePassword = ({ admin, user, disabled }: ChangePasswordProps) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<Dispatch>();

  const onCreate = (values: any) => {
    if (admin) {
      dispatch.auth.resetPassword({ user: user, newPassword: values.newPassword });
    } else {
      dispatch.auth.changePassword({
        user: localStorage.getItem(USER_LOCAL_STORAGE_KEY),
        newPassword: values.newPassword,
        oldPassword: values.currentPassword,
      });
    }

    setOpen(false);
  };

  return (
    <div>
      <div
        onClick={(e) => {
          setOpen(true);
        }}
      >
        {admin ? (
          <Button disabled={disabled}> Reset password </Button>
        ) : (
          <>
            <ImgIcon src={changePassword} alt="changepassword" />
            <span>Change password</span>
          </>
        )}
      </div>
      <ChangePasswordForm
        admin={admin}
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export { ChangePassword };
