import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    password: Yup.string()
    .min(6, 'Password cần tối thiểu 6 ký tự !')
    .max(50, 'Password tối đa 50 ký tự !')
    .required('Password không được để trống !'),
    email: Yup.string().email('Định dạng Email không hợp lệ !').required('Email không được để trống !'),
});

export const SignUpSchema = Yup.object().shape({
    password: Yup.string()
    .min(6, 'Password cần tối thiểu 6 ký tự !')
    .max(50, 'Password tối đa 50 ký tự !')
    .required('Password không được để trống !'),
    email: Yup.string().email('Định dạng Email không hợp lệ !').required('Email không được để trống !'),
    name: Yup.string().required('Họ tên không được để trống !'),
});

export const UpdateUserSchema = Yup.object().shape({
    name: Yup.string()
      .required('Họ tên không được để trống'),
    phone: Yup.string()
      .required('Số điện thoại không được để trống'),
  });

  export const ChangePasswordSchema = Yup.object().shape({
    password: Yup.string()
    .min(6, 'Password cần tối thiểu 6 ký tự !')
    .max(50, 'Password tối đa 50 ký tự !')
    .required('Password không được để trống !'),
  });
    
    