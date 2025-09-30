"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import "./page.css";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // State for displaying errors
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // --- (CHANGE 1) ---
      // Your backend has a global prefix 'api/v1' and an 'auth' controller.
      // The correct endpoint for registration is `/api/v1/auth/register`.
      const response = await axios.post("/api/v1/auth/register", {
        // --- (CHANGE 2) ---
        // The object sent to the backend MUST match the RegisterDto.
        // Your previous code had a typo: `firstname`. It must be `firstName`.
        firstName,
        lastName,
        email,
        phone,
        password,
      });

      if (response.status === 201) {
        alert("User registered successfully! Please log in.");
        router.push("/login");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        // Use the error message from the backend if available
        const message = err.response.data?.message || "An error occurred during registration.";
        setError(Array.isArray(message) ? message.join(', ') : message);
      } else {
        console.error("An unexpected error occurred:", err);
        setError("An unexpected error occurred. Check your connection.");
      }
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
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm.75 4a.75.75 0 00-1.5 0v.09c-1.72.23-2.81.52-3.45.82a.75.75 0 00-.43 1.11c.19.3.63.73 1.26 1.15 1.48.99 2.02 1.93 1.68 2.85-.34.92-1.42 1.32-2.82 1.32v.09a.75.75 0 001.5 0v-.09c1.72-.23 2.81-.52 3.45-.82a.75.75 0 00.43-1.11c-.19-.3-.63-.73-1.26-1.15-1.48-.99-2.02-1.93-1.68-2.85.34-.92 1.42-1.32 2.82-1.32V6z" />
          </svg>
          <span>Valise</span>
        </div>
        <h1 className="login-title">Create an Account</h1>
        <p className="login-subtitle">Start your journey with us today.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          {/* First Name Input */}
          <label>First Name</label>
          <input type="text" placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          
          {/* Last Name Input */}
          <label>Last Name</label>
          <input type="text" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />

          {/* Email Input */}
          <label>Email Address</label>
          <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          
          {/* Phone Number Input */}
          <label>Phone Number</label>
          <input type="tel" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required />

          {/* Password Input with Toggle Button */}
          <label>Password</label>
          <div className="password-wrapper">
            <input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? ( <svg>...</svg> ) : ( <svg>...</svg> )}
            </button>
          </div>
          
          {/* Confirm Password Input with Toggle Button */}
          <label>Confirm Password</label>
          <div className="password-wrapper">
            <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <button type="button" className="password-toggle-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? ( <svg>...</svg> ) : ( <svg>...</svg> )}
            </button>
          </div>
          
          {/* Display errors dynamically */}
          {error && <p style={{ color: "red", marginTop: "1rem", textAlign: "center" }}>{error}</p>}

          <button type="submit" className="login-button">Sign Up</button>
        </form>

        <div className="login-divider">OR</div>
        <p className="signup-link">
          Already have an account? <Link href="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}