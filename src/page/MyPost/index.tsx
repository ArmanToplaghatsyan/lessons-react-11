import React, { useEffect, useState } from 'react';
import { IPost, IUser, MyCollection, MyWhere } from '../../type/type';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { addData, searchData } from '../../firebase/firestore';
import { useForm } from 'react-hook-form';

export const MyPost: React.FC = React.memo((): JSX.Element => {
  const [use, setUse] = useState<IUser>({} as IUser);
  const [posts, setPost] = useState<IPost[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        searchData<IUser>(
          MyCollection.USERS,
          'email',
          MyWhere.EQUAL_TO,
          user.email,
        )
          .then((res) => {
            if (res.length) {
              setUse(res[0]);
              searchData<IPost>(
                MyCollection.POSTS,
                'user_id',
                MyWhere.EQUAL_TO,
                res[0].id,
              )
                .then((res) => {
                  setPost(res);
                  console.log(res);
                })
                .catch(console.warn);
            }
          })
          .catch(console.warn);
      } else {
        navigate('/');
      }
    });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPost>();
  const save = (data: IPost): void => {
    console.log(data);
    addData<IPost>(MyCollection.POSTS, { ...data, user_id: use.id })
      .then((res) => {
        console.log(res);
        reset();

        searchData<IPost>(
          MyCollection.POSTS,
          'user_id',
          MyWhere.EQUAL_TO,
          use.id,
        )
          .then((res) => {
            console.log(res);
            setPost(res);
          })
          .catch(console.warn);
      })
      .catch(console.warn);
  };

  return (
    <div className="mypost">
      <form onSubmit={handleSubmit(save)}>
        <h2>My Post</h2>
        <br />
        <label>Title</label>
        <br />
        <input
          type="text"
          placeholder="title"
          {...register('title', { required: 'Enter title' })}
        />
        {errors.title && <p>{errors.title.message}</p>}
        <br />
        <label>Body</label>
        <br />
        <textarea
          placeholder="body"
          {...register('body', { required: 'Enter body' })}
        />
        {errors.body && <p>{errors.body.message}</p>}
        <br />
        <button>Save</button>
        <br />
      </form>
      <hr />

      {posts.map((elm) => {
        return (
          <div key={elm.id}>
            <h3>{elm.title}</h3>
            <p>{elm.body}</p>
          </div>
        );
      })}
    </div>
  );
});
