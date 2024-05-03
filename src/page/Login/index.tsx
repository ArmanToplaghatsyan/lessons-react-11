import React from 'react';
import { useForm } from 'react-hook-form';
import { IUser } from '../../type/type';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';

export const Login: React.FC = React.memo((): JSX.Element => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<IUser>();
  const navigate = useNavigate();

  const save = (data: IUser): void => {
    console.log(data);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        console.log(res);
        navigate('/profile')
      })
      .catch((err)=>{
        setError("password", {message:err.message.slice(10)});
        
      })
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit(save)}>
        <h2>Login</h2>
        <label>Email</label>
        <br />
        <input
          type="text"
          {...register('email', {
            required: 'Enter email',
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Not a email',
            },
          })}
          placeholder="email"
        />
        {errors.email && <p>{errors.email.message}</p>}
        <br />
        <label>Password</label>
        <br />
        <input
          type="text"
          {...register('password', { required: 'Enter password' })}
          placeholder="password"
        />
        {errors.password && <p>{errors.password.message}</p>}
        <br />
        <button>Save</button>
        <br />
      </form>
    </div>
  );
});
