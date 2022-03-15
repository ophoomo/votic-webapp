import { useState } from "react";

const Navbar: React.VFC = () => {

  const [Status, setStatus] = useState(false);
  
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="container">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width={112}
            height={28}
          />
        </a>
        <a
          role="button"
          onClick={() => setStatus(!Status)}
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>
      <div id="navbarBasicExample" className={`navbar-menu ${Status && 'is-active'}`}>
        <div className="navbar-start">
          <a className="navbar-item">Home</a>
          <a className="navbar-item">Documentation</a>
        </div>
      </div>
    </div>
    </nav>
  );
};

export default Navbar;
