import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase/config';
import { NavLink, useNavigate } from 'react-router-dom';

export const Menu: React.FC = React.memo((): JSX.Element => {
 const [bool, setBool] = useState<boolean>(false)
 const navigate = useNavigate()


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if(user){
        setBool(true)
      }else{
        setBool(false)
      }
    })
  }, [])
  
  
  return (
    <div className="menu">
      {
        bool?
        <ul>
          <li><NavLink to={'/profile'}>Profile</NavLink></li>
          <li><NavLink to={'/mypost'}>My Post</NavLink></li>
          <li><button onClick={() => {
            signOut(auth);
            navigate('/')

          }}>Log Out</button></li>
        </ul>
    :<ul>
      <li><NavLink to={'/'}>LogIn</NavLink></li>
      <li><NavLink to={'/register'}>Register</NavLink></li>
    </ul>  
    
    }

    </div>
  );
});
