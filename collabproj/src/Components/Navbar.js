import "./Navbar.css";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  color: blue;
`;

const Navbar = () => {
  return (
    <div>
      <Container>
        <h4>Shuttl</h4>
      </Container>
      
      <div className="sidebar">
        <Link className="active" to="/login">
          Login
        </Link>
        <Link to="/">My Pass</Link>
        <Link to="/">My Rides</Link>
        <Link to="/">Wallets</Link>
        <Link to="/">Routes</Link>
      </div>
    </div>
    
  );
};

export default Navbar;
