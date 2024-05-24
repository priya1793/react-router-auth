import { Link } from "react-router-dom";

export const HomeNavigation = ({ isAuthenticated }) => {
  return (
    <nav className="navigation">
      {!isAuthenticated ? <Link to="/login">Login</Link> : null}
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/services">Services</Link>
    </nav>
  );
};
