import React from 'react';
import SideBar from './SideBar';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="h-full bg-gray-900">
      <SideBar />
      <div className="xl:pl-72">
        <main className="py-10">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
