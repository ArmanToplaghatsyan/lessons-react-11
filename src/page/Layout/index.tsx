import React from 'react';
import { Menu } from '../../component/Menu';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = React.memo((): JSX.Element => {
  return (
    <div className="border border-3">
      <Menu/>
      <Outlet/>
    </div>
  );
});
