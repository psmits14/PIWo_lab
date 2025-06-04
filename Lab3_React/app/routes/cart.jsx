"use client"

import { useContext } from "react"
import InProgressContext from "../Contexts/inProgressContext"
import { useNavigate } from "react-router"

const Cart = () => {
  const { state, dispatch, clearCart } = useContext(InProgressContext)
  const navigate = useNavigate()

  const updateQuantity = (item, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch({ type: "REMOVE_ITEM", payload: item })
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity: newQuantity } })
    }
  }

  const removeItem = (item) => {
    dispatch({ type: "REMOVE_ITEM", payload: item })
  }

  const getTotalPrice = () => {
    return state.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getItemsCount = () => {
    return state.reduce((total, item) => total + item.quantity, 0)
  }

  const handleCheckout = () => {
    // Tutaj można dodać logikę płatności
    alert("Funkcja płatności zostanie wkrótce dodana!")
    // Po udanej płatności można wyczyścić koszyk:
    // clearCart()
  }

  if (state.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h2>Twój koszyk jest pusty</h2>
          <p>Dodaj książki do koszyka, aby kontynuować zakupy</p>
          <button className="continue-shopping-btn" onClick={() => navigate("/")}>
            Kontynuuj zakupy
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <div className="cart-header-content">
          <h1>
            Koszyk ({getItemsCount()})
          </h1>
          {state.length > 0 && (
            <button className="clear-cart-btn" onClick={clearCart} title="Wyczyść koszyk">
              Wyczyść koszyk
            </button>
          )}
        </div>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {state.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.image || "/images/bookcover.jpg"} alt={item.title} />
              </div>

              <div className="cart-item-details">
                <h3 className="cart-item-title">{item.title}</h3>
                <p className="cart-item-author">Autor: {item.author}</p>
                <div className="cart-item-meta">
                  <span className="cart-item-cover">{item.cover}</span>
                  <span className="cart-item-genre">{item.genre}</span>
                </div>
              </div>

              <div className="cart-item-quantity">
                <button className="quantity-btn" onClick={() => updateQuantity(item, item.quantity - 1)}>
                  -
                </button>
                <span className="quantity-display">{item.quantity}</span>
                <button className="quantity-btn" onClick={() => updateQuantity(item, item.quantity + 1)}>
                  +
                </button>
              </div>

              <div className="cart-item-price">
                <div className="item-unit-price">{item.price.toFixed(2)} zł</div>
                <div className="item-total-price">{(item.price * item.quantity).toFixed(2)} zł</div>
              </div>

              <button className="cart-item-remove" onClick={() => removeItem(item)} title="Usuń z koszyka">
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="cart-summary-content">
            <h3>Podsumowanie zamówienia</h3>

            <div className="summary-row">
              <span>Wartość produktów:</span>
              <span>{getTotalPrice().toFixed(2)} zł</span>
            </div>

            <div className="summary-row">
              <span>Dostawa:</span>
              <span>Bezpłatna</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row summary-total">
              <span>Do zapłaty:</span>
              <span>{getTotalPrice().toFixed(2)} zł</span>
            </div>

            <button className="checkout-btn" onClick={handleCheckout}>
              Przejdź do płatności
            </button>

            <button className="continue-shopping-btn" onClick={() => navigate("/")}>
              Kontynuuj zakupy
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
