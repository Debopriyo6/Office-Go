import "./Navbar.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { globalcontext } from "../../GlobalContext";

const Container = styled.div`
  color: blue;
`;

const Navbar = () => {
  const { login, setLogin } = useContext(globalcontext);

  const logoutHandler = () => {
    setLogin(false);
  };
  return (
    <div>
      <Container>
        <h4>Shuttl</h4>
      </Container>

      <div className="sidebar">
        {!login && (
          <Link className="active" to="/auth?mode=login">
            Login
          </Link>
        )}
        {login && <Link onClick={logoutHandler}>Logout</Link>}

        <Link to="/">My Pass</Link>
        <Link to="/">My Rides</Link>
        <Link to="/">Wallets</Link>
        <Link to="/">Routes</Link>
      </div>
    </div>
  );
};

export default Navbar;
