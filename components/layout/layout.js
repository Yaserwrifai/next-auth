import { Fragment } from 'react';
import Sidebar from "../Sidebar/Sidebar";


import MainNavigation from './main-navigation';

function Layout(props) {
  return (
    <Fragment>
      <Sidebar />
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
