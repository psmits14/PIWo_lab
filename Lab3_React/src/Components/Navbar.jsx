import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../Services/init";
import { login, logout } from "../Services/UserService";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <NavLink to="/" className="logo-link">
          📖 Księgarnia Między Kartkami
        </NavLink>
      </div>

      <div className="nav-actions">
        <NavLink to="/new" className="icon-btn" title="Dodaj książkę">
          <img src="./plus.png" alt="Dodaj książkę" className="icon" />
        </NavLink>

        <button className="icon-btn" title="Koszyk">
          <img src="./cart.png" alt="Koszyk" className="icon" />
        </button>

        {user ? (
          <>
            <span className="user-greeting">Witaj, {user.displayName}</span>
            <button className="login-btn" onClick={logout}>
              Wyloguj
            </button>
          </>
        ) : (
          <button className="login-btn" onClick={login}>
            Zaloguj się z Google
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
