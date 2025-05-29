import { NavLink, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { logout, onAuthChange } from "../services/UserService";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthChange(setUser);
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Błąd wylogowania:", error);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <NavLink to="/" className="logo-link">
          📖 Księgarnia Między Kartkami
        </NavLink>
      </div>

      <div className="nav-actions">
        <NavLink to="/new" className="icon-btn" data-cy="add-book-btn" title="Dodaj książkę">
          <img src="/images/plus.png" alt="Dodaj książkę" className="icon" />
        </NavLink>

        <button className="icon-btn" title="Koszyk">
          <img src="/images/cart.png" alt="Koszyk" className="icon" />
        </button>

        {user ? (
          <>
            <span className="user-name">{user.displayName || user.email}</span>
            <button className="login-btn" onClick={handleLogout}>
              Wyloguj
            </button>
          </>
        ) : (
          <button className="login-btn" onClick={handleLoginRedirect}>
            Zaloguj się
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
