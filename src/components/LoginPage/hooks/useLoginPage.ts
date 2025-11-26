import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { authSchema } from '../authSchema';
import { IAuthData } from 'types/types';
import { authoriseUser } from 'app/store/authUserClice';

const useLoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
    watch,
    clearErrors,
  } = useForm<IAuthData>({
    resolver: yupResolver(authSchema),
    defaultValues: {
      name: '',
      mail: '',
    },
    mode: 'onSubmit',
  });

  const nameValue = watch('name');
  const mailValue = watch('mail');

  useEffect(() => {
    if (isSubmitted) {
      clearErrors();
    }
  }, [nameValue, mailValue, isSubmitted, clearErrors]);

  const onSubmit = (data: IAuthData) => {
    dispatch(
      authoriseUser({
        name: data.name,
        mail: data.mail,
      })
    );
    navigate('/');
  };

  return { control, handleSubmit, errors, onSubmit };
};
export default useLoginPage;
