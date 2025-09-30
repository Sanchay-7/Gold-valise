"use client";

import Link from "next/link";
import { useState } from "react";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation"; // Changed from 'next/link'
import "./page.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize the Next.js router

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // --- (CHANGE 1) ---
      // Your NestJS backend likely uses a route like '/auth/login'.
      // We'll proxy this request in next.config.js
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      if (response.status === 200 && response.data.accessToken) {
        // --- (CHANGE 2) ---
        // The backend sends back an 'accessToken'. We MUST save it.
        // localStorage is a common place to store it.
        localStorage.setItem("accessToken", response.data.accessToken);

        // --- (CHANGE 3) ---
        // Use the Next.js router for a smooth, client-side redirect
        // instead of a full page reload.
        router.push("/dashboard");
      }
    } catch (err) {
      // Using the robust error handling we discussed before
      if (isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message as string);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <Link href="/" className="back-button-symbol">
          {/* Back button SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </Link>

        <div className="login-logo">
          {/* Logo SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm.75 4a.75.75 0 00-1.5 0v.09c-1.72.23-2.81.52-3.45.82a.75.75 0 00-.43 1.11c.19.3.63.73 1.26 1.15 1.48.99 2.02 1.93 1.68 2.85-.34.92-1.42 1.32-2.82 1.32v.09a.75.75 0 001.5 0v-.09c1.72-.23-2.81-.52-3.45-.82a.75.75 0 00.43-1.11c-.19-.3-.63-.73-1.26-1.15-1.48-.99-2.02-1.93-1.68-2.85.34-.92 1.42-1.32 2.82-1.32V6z" />
          </svg>
          <span>Valise</span>
        </div>

        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Log in to continue your journey.</p>

        <form className="login-form" onSubmit={handleLogin}>
          {/* Email Input */}
          <label>Email Address</label>
          <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />

          {/* Password Input */}
          <label>Password</label>
          <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <div className="login-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#">Forgot password?</a>
          </div>

          {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="login-divider">OR</div>

        <p className="signup-link">
          Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}