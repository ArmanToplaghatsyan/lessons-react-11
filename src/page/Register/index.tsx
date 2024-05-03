import React from 'react';
import { useForm } from 'react-hook-form';
import { IUser, MyCollection } from '../../type/type';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { addData } from '../../firebase/firestore';

export const Register: React.FC = React.memo((): JSX.Element => {
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<IUser>();
 
  const save = (data: IUser): void => {
    console.log(data);
    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((res) => {
      console.log(res);
      const {password, ...us} = data
      addData<IUser>(MyCollection.USERS, us)
      .then((res) => {
        reset();
        signOut(auth);
        navigate('/')
      })
    })
    .catch((err)=>{
      setError("password", {message:err.message.slice(10)});
      
    })
    
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit(save)}>
        <h2>Register</h2>

        <br />
        <label>Name</label>
        <input
          type="text"
          {...register('name', { required: 'Enter name' })}
          placeholder="name"
        />
        {errors.name && <p>{errors.name.message}</p>}

        <br />
        <label>Surname</label>
        <input
          type="text"
          {...register('surname', { required: 'Enter surname' })}
          placeholder="surname"
        />
        {errors.surname && <p>{errors.surname.message}</p>}
        <br />
        <label>Age</label>
        <input
          type="text"
          {...register('age', {
            required: 'Enter age',
            pattern: {
              value: /^\d+$/,
              message: 'NaN',
            },
          })}
          placeholder="age"
        />
        {errors.age && <p>{errors.age.message}</p>}
        <br />
        <label>Email</label>
        <input
          type="email"
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
        <input
          type="password"
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
