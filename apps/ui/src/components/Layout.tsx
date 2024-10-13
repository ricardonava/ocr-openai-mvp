import React from 'react';
import Header from './Header';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <div className="px-20 py-10">{children}</div>
    </div>
  );
};

export default Layout;
