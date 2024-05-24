import { Outlet } from "react-router-dom";
import { ServiceNavigation } from "../navigation/Service";

export const ServicesLayout = () => {
  return (
    <>
      <ServiceNavigation />
      <Outlet />
    </>
  );
};
