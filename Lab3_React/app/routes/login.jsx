"use client"

import { useState } from "react"
import { loginWithEmail, registerWithEmail, loginWithGoogle } from "../services/UserService"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isRegistering, setIsRegistering] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isRegistering) {
        await registerWithEmail(email, password)
        alert("Konto zostało utworzone!")
      } else {
        await loginWithEmail(email, password)
        alert("Zalogowano!")
      }
      window.location.href = "/"
    } catch (err) {
      alert("Błąd: " + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)

    try {
      await loginWithGoogle()
      alert("Zalogowano przez Google!")
      window.location.href = "/"
    } catch (err) {
      alert("Błąd Google Login: " + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="form-container">
      <h2>{isRegistering ? "Rejestracja" : "Logowanie"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="adres@email.com"
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Hasło</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={isLoading}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? "Przetwarzanie..." : isRegistering ? "Zarejestruj się" : "Zaloguj się"}
        </button>
      </form>

      <button onClick={handleGoogleLogin} className="google-btn" disabled={isLoading}>
        Zaloguj przez Google
      </button>

      <div style={{ marginTop: "1.5em", textAlign: "center" }}>
        {isRegistering ? "Masz już konto?" : "Nie masz konta?"}{" "}
        <button className="link-btn" onClick={() => setIsRegistering(!isRegistering)} disabled={isLoading}>
          {isRegistering ? "Zaloguj się" : "Zarejestruj się"}
        </button>
      </div>
    </div>
  )
}
