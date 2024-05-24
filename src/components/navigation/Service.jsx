import { Link } from "react-router-dom";

export const ServiceNavigation = () => {
  return (
    <div className="container">
      <Link to="one">
        <div className="service-card">Service One</div>
      </Link>

      <Link to="two">
        <div className="service-card">Service Two</div>
      </Link>
    </div>
  );
};
