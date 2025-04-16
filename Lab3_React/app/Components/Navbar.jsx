import { NavLink } from "react-router-dom";

const Navbar = () => (
    <nav className="navbar">
      <div className="logo">
        <NavLink to="/" className="logo-link">
          📖 Księgarnia Między Kartkami
        </NavLink>
      </div>
  
      <div className="nav-actions">
        <NavLink to="/new" className="icon-btn" title="Dodaj książkę">
          <img src="/images/plus.png" alt="Dodaj książkę" className="icon" />
        </NavLink>
  
        <button className="icon-btn" title="Koszyk">
          <img src="/images/cart.png" alt="Koszyk" className="icon" />
        </button>
  
        <button className="login-btn">Zaloguj się</button>
      </div>
    </nav>
  );
  
  export default Navbar;