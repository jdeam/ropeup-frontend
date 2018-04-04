import React from 'react';
import FontAwesome from 'react-fontawesome';

const Footer = () => {

  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>RopeUp</strong> by <a href="https://github.com/jdeam">Jordan Deam</a>. Design by <a href="https://www.uxpaige.com/">Paige Jensen</a>.
        </p>
        <p>
          <FontAwesome name="github" />
        </p>
      </div>
    </footer>
  );
}

export default Footer;
