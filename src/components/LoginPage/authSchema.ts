import * as yup from 'yup';

export const authSchema = yup.object({
  name: yup
    .string()
    .required('Имя обязательно')
    .matches(/^[a-zA-Zа-яА-ЯёЁ\s]+$/, 'Имя не должно содержать цифры и специальные символы')
    .min(2, 'Не менее двух символов')
    .max(50, 'Не более 50 символов'),
  mail: yup
    .string()
    .required('Почта обязательна')
    .email('Введите корректный email адрес')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Некорректный формат email'),
});

export type AuthFormData = yup.InferType<typeof authSchema>;
