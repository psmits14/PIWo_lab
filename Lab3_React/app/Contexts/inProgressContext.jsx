"use client"

import { createContext, useReducer } from "react"

const CART_STORAGE_KEY = "bookstore_cart"

// Funkcja do ładowania koszyka z localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    return savedCart ? JSON.parse(savedCart) : []
  } catch (error) {
    console.error("Błąd ładowania koszyka z localStorage:", error)
    return []
  }
}

// Funkcja do zapisywania koszyka do localStorage
const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  } catch (error) {
    console.error("Błąd zapisywania koszyka do localStorage:", error)
  }
}

const initState = loadCartFromStorage()

const reduce = (state, action) => {
  let newState

  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.find((item) => item.id === action.payload.id)
      if (existingItem) {
        newState = state.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      } else {
        newState = [...state, { ...action.payload, quantity: 1 }]
      }
      break

    case "REMOVE_ITEM":
      newState = state.filter((it) => it.id !== action.payload.id)
      break

    case "UPDATE_QUANTITY":
      newState = state.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
      )
      break

    case "CLEAR_CART":
      newState = []
      break

    default:
      newState = state
  }

  // Zapisz nowy stan do localStorage
  saveCartToStorage(newState)
  return newState
}

const InProgressContext = createContext()

export const InProgressProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reduce, initState)

  // Opcjonalnie: dodaj funkcję do czyszczenia koszyka
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  return <InProgressContext.Provider value={{ state, dispatch, clearCart }}>{children}</InProgressContext.Provider>
}

export default InProgressContext
