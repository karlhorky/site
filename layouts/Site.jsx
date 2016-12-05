import React from 'react';
import Footer from '../components/Footer.jsx';

const Site = ({ children }) => (
  <div id="site" className="site">
    {children}

    <Footer section={children} />

    <GitterChat />
  </div>
);

const GitterChat = () => (
  <div className="gitter-open-chat-button">Need help?</div>
);

export default Site;
