import "./App.css";
import {
  Link,
  Navigate,
  RouterProvider,
  createBrowserRouter,
  redirect,
  useNavigate,
} from "react-router-dom";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Service1 } from "./components/Service1";
import { Service2 } from "./components/Service2";
import { ServicesLayout } from "./components/layout/Service";
import { MainLayout } from "./components/layout/Home";
import { useState } from "react";

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

function checkUserAuthentication() {
  return !!getAccessToken();
}

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email !== "" && password !== "") {
        localStorage.setItem("accessToken", "1234");
      }
      const response = await checkUserAuthentication();
      if (!response) alert("please enter valid details");
      navigate("/dashboard");
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <>
      <div className="container">
        <div className="inner">
          <div className="login-header">
            <h1>Login</h1>
            <button type="button" onClick={() => navigate("/")}>
              Go back
            </button>
          </div>
          <form onSubmit={handleSubmit} className="loginForm">
            <label htmlFor="email">Email address:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            {error && <span style={{ color: "red" }}>{error}</span>}
            <br />
            <input type="submit" value="submit" />
          </form>
        </div>
      </div>
    </>
  );
};

export function PrivateRoute({ children }) {
  return checkUserAuthentication() ? children : <Navigate to="/login" />;
}

export const Dashboard = ({ checkUserAuthentication }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear("accessToken");
    checkUserAuthentication();
    navigate("/login");
  };
  return (
    <div className="container">
      <div className="inner" style={{ textAlign: "center" }}>
        <h1 style={{ marginBottom: "4rem" }}>Dashboard Page</h1>
        <Link onClick={logout} className="logout-btn">
          Logout
        </Link>
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout isAuthenticated={checkUserAuthentication()} />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "services",
        element: <ServicesLayout />,
      },
      {
        path: "services",
        children: [
          {
            path: "one",
            element: <Service1 />,
          },
          {
            path: "two",
            element: <Service2 />,
          },
        ],
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "login",
    loader: () => (checkUserAuthentication() ? redirect("/dashboard") : null),
    element: <Login />,
  },
  {
    path: "logout",
    loader: () => {
      localStorage.clear("accessToken");
      return checkUserAuthentication() ? redirect("/login") : null;
    },
    element: <Navigate to="/" />,
  },
]);

function App() {
  return <RouterProvider router={router} fallbackElement={<p>Leading...</p>} />;
}

export default App;
