import React from 'react';

if (process.env.BROWSER) {
  require('./style.scss');
}

function Footer () {
  return (
    <footer className='footer' role='contentinfo'>
      <a href='https://github.com/bauscode' target='_blank'>BausCode GitHub</a>
    </footer>
  );
}

export default Footer;

