import { Fragment } from 'react';

import Navigation from './Navigation/Navigation';
import Footer from './Footer/Footer';

const Layout: React.FC = (props) => {
  return (
    <Fragment>
      <Navigation />
      {props.children}
      <Footer />
    </Fragment>
  );
};

export default Layout;
