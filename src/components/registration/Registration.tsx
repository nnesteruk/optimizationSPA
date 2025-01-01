import { Button, DatePicker, Input, Modal, Radio, Select } from 'antd';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

export const Registration = () => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('');
  const password = watch('password');
  const showModal = () => {
    setOpen(true);
    console.log(open);
  };
  const handleOk = () => {
    setModalText('Регистрация прошла успешно!');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      console.log('Successfully');
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const onSubmit = (data) => {
    setModalText(() => JSON.stringify(data));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Имя пользователя:</label>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Поле обязательное для заполнения' }}
            render={({ field }) => <Input {...field} placeholder="Username" />}
          />
          <p>{errors.name?.message}</p>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: { value: true, message: 'Введите email' },
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                message: 'Введите корректный email.',
              },
            }}
            render={({ field }) => <Input {...field} placeholder="Email" />}
          />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="password">Пароль:</label>
          <Controller
            name="password"
            control={control}
            rules={{
              required: { value: true, message: 'Введите пароль' },
              pattern: {
                value: /^(?=.*[A-Z]).{6,}$/,
                message: 'Пароль должен содержать минимум 6 символов и 1 заглавную букву',
              },
            }}
            render={({ field }) => (
              <Input.Password {...field} visibilityToggle placeholder="Password" />
            )}
          />
          <p>{errors.password?.message}</p>
        </div>
        <div>
          <label htmlFor="confirmed password">Подтверждение пароля:</label>
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: { value: true, message: 'Подтвердите свой пароль' },
              validate: (value) => value === password || 'Пароль не совпадает',
            }}
            render={({ field }) => (
              <Input.Password {...field} visibilityToggle placeholder="Confirmed password" />
            )}
          />
          <p>{errors.confirmPassword?.message}</p>
        </div>
        <div>
          <label htmlFor="date">Дата рождения:</label>
          <Controller
            name="date"
            control={control}
            rules={{ required: { value: true, message: 'Выберите дату' } }}
            render={({ field }) => <DatePicker {...field} />}
          />
          <p>{errors.date?.message}</p>
        </div>
        <div>
          <label htmlFor="gender">Пол: </label>
          <Controller
            name="gender"
            control={control}
            rules={{ required: { value: true, message: 'Выберите пол' } }}
            render={({ field }) => (
              <Radio.Group {...field}>
                <Radio value="male">Man</Radio>
                <Radio value="female">Woman</Radio>
              </Radio.Group>
            )}
          />
          <p>{errors.gender?.message}</p>
        </div>
        <div>
          <label htmlFor="tel">Номер телефона: </label>
          <Controller
            name="tel"
            control={control}
            rules={{ required: { value: true, message: 'Введите номер телефона' } }}
            render={({ field }) => (
              <Input
                addonBefore={
                  <Select
                    style={{ minWidth: 70, backgroundColor: 'white' }}
                    options={[
                      { value: '375', label: '+375' },
                      { value: '87', label: '+87' },
                    ]}
                  />
                }
                type="number"
                {...field}
              />
            )}
          />
          <p>{errors.tel?.message}</p>
        </div>
        <Button type="primary" htmlType="submit" onClick={showModal}>
          Зарегистрироваться
        </Button>
      </form>
      <Modal
        title="Регистрация"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        {modalText}
      </Modal>
    </>
  );
};
