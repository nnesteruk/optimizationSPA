import { Button, DatePicker, Input, Modal, Radio, Select, Tooltip } from 'antd';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const Registration = () => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('');
  const password = watch('password');
  const [prefix, setPrefix] = useState('+375');
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText('Регистрация прошла успешно!');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      console.log('Successfully');
      navigate('/main');
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const onSubmit = (data) => {
    setModalText(() =>
      JSON.stringify(data, (key, value) => {
        if (key === 'tel') {
          return `${prefix}${value}`;
        }
        return value;
      }),
    );
    showModal();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="form">
          <legend className="title">Регистрация</legend>
          <div className="item">
            <div className="item__row">
              <label htmlFor="name">Имя пользователя:</label>
              <Controller
                name="name"
                control={control}
                rules={{ required: { value: true, message: 'Введите имя пользователя' } }}
                render={({ field }) => <Input {...field} placeholder="Username" />}
              />
            </div>
            <p>{errors.name?.message}</p>
          </div>
          <div className="item">
            <div className="item__row">
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
            </div>
            <p>{errors.email?.message}</p>
          </div>
          <div className="item">
            <div className="item__row">
              <label htmlFor="password">Пароль:</label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: { value: true, message: 'Введите пароль' },
                  pattern: /^(?=.*[A-Z]).{6,}$/,
                }}
                render={({ field }) => (
                  <Tooltip title="Пароль должен содержать минимум 6 символов и 1 заглавную букву">
                    <Input.Password {...field} visibilityToggle placeholder="Password" />
                  </Tooltip>
                )}
              />
            </div>
            <p>{errors.password?.message}</p>
          </div>
          <div className="item">
            <div className="item__row">
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
            </div>
            <p>{errors.confirmPassword?.message}</p>
          </div>
          <div className="item">
            <div className="item__row">
              <label htmlFor="date">Дата рождения:</label>
              <Controller
                name="date"
                control={control}
                rules={{
                  required: { value: true, message: 'Выберите дату' },
                  validate: (value) => value <= new Date() || 'Неверно укаазана дата',
                }}
                render={({ field }) => <DatePicker {...field} />}
              />
            </div>
            <p>{errors.date?.message}</p>
          </div>
          <div className="item">
            <div className="item__row">
              <label htmlFor="gender">Пол: </label>
              <Controller
                name="gender"
                control={control}
                rules={{
                  required: { value: true, message: 'Выберите пол' },
                }}
                render={({ field }) => (
                  <Radio.Group {...field}>
                    <Radio value="male" className="radio__item">
                      Мужской
                    </Radio>
                    <Radio value="female" className="radio__item">
                      Женский
                    </Radio>
                  </Radio.Group>
                )}
              />
            </div>
            <p>{errors.gender?.message}</p>
          </div>
          <div className="item">
            <div className="item__row">
              <label htmlFor="tel">Номер телефона: </label>
              <Controller
                name="tel"
                control={control}
                rules={{
                  required: { value: true, message: 'Введите номер телефона' },
                  pattern: { value: /^\+?\d{8,13}$/, message: 'Неверно указан телефон' },
                }}
                render={({ field }) => (
                  <Input
                    addonBefore={
                      <Select
                        style={{ minWidth: 70, backgroundColor: 'white' }}
                        options={[
                          { value: '+375', label: '+375' },
                          { value: '+87', label: '+87' },
                        ]}
                        defaultValue="+375"
                        onChange={(value) => setPrefix(value)}
                      />
                    }
                    {...field}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      field.onChange(inputValue);
                    }}
                  />
                )}
              />
            </div>
            <p>{errors.tel?.message}</p>
          </div>
          <Button type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
        </fieldset>
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
