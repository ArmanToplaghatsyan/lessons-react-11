import React, { useEffect, useState } from 'react';
import { IUser, MyCollection, MyWhere } from '../../type/type';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { searchData } from '../../firebase/firestore';

export const Profile: React.FC = React.memo((): JSX.Element => {
  const [use, setUse] = useState<IUser>({} as IUser)
  const navigate = useNavigate()
  
  useEffect(() => {
   onAuthStateChanged(auth, (user) => {
     if(user){
      searchData<IUser>(MyCollection.USERS, 'email', MyWhere.EQUAL_TO, user.email)
      .then((res) => {
        console.log(res)
        if(res.length){
          setUse(res[0])
        }
      }).catch(console.warn)
     }else{
      navigate('/')
     }

   })
  }, [])
  
  return (
    <div className="profile">
      <h2>Profile - {use.name} {use.surname}</h2>
      <p>{use.email}</p>
      <p>{use.age}</p>
      
    </div>
  );
});
