import { useState } from "react";
import { api } from "./services/api";
import logo from "./assets/logo.jpeg";

function SignUpScreen({ setScreen }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await api.signUp(name, email, password);
      
      if (result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        setLoading(false);
        setScreen("vetdashboard");
      } else {
        setError(result.message || "Sign up failed");
        setLoading(false);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      fontFamily: "Inter, sans-serif",
      background: "#ffffff",
    }}>
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        background: "linear-gradient(135deg, #071407 0%, #1a3a1a 50%, #295F2D 100%)",
        position: "relative",
      }}>
        <img
          src={logo}
          alt="AGRICARE Logo"
          style={{
            width: "120px",
            height: "120px",
            objectFit: "contain",
            marginBottom: "16px",
          }}
        />
        <h1 style={{
          color: "white",
          fontSize: "36px",
          fontWeight: 800,
          letterSpacing: "4px",
          margin: 0,
        }}>AGRICARE</h1>
        <p style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: "14px",
          margin: "8px 0 4px",
          letterSpacing: "2px",
        }}>
          Security Dashboard
        </p>
        <p style={{
          color: "rgba(255,255,255,0.25)",
          fontSize: "13px",
          margin: "4px 0 0",
        }}>
          Real-time response, every second counts.
        </p>
      </div>

      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "40px 60px",
        background: "#ffffff",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
          marginBottom: "40px",
        }}>
          <button
            onClick={() => setScreen("signin")}
            style={{
              padding: "8px 24px",
              borderRadius: "8px",
              background: "transparent",
              color: "#6b7280",
              border: "1px solid #d1d5db",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Sign in
          </button>
          <button
            style={{
              padding: "8px 24px",
              borderRadius: "8px",
              background: "#295F2D",
              color: "white",
              border: "none",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Sign up
          </button>
        </div>

        <div>
          <h2 style={{
            color: "#1a1a2e",
            fontSize: "28px",
            fontWeight: 700,
            margin: "0 0 4px",
          }}>Create account</h2>
          <p style={{
            color: "#6b7280",
            fontSize: "14px",
            margin: "0 0 32px",
          }}>
            Sign up to get started.
          </p>

          {error && (
            <div style={{
              background: "#fee2e2",
              color: "#dc2626",
              padding: "10px 14px",
              borderRadius: "8px",
              marginBottom: "16px",
              fontSize: "13px",
              border: "1px solid #fecaca",
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{
                color: "#374151",
                fontSize: "13px",
                fontWeight: 600,
                display: "block",
                marginBottom: "6px",
              }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  background: "#f9fafb",
                  color: "#111827",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => e.target.style.borderColor = "#295F2D"}
                onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{
                color: "#374151",
                fontSize: "13px",
                fontWeight: 600,
                display: "block",
                marginBottom: "6px",
              }}>
                Username
              </label>
              <input
                type="email"
                placeholder="Enter your username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  background: "#f9fafb",
                  color: "#111827",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => e.target.style.borderColor = "#295F2D"}
                onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
              />
            </div>

            <div style={{ marginBottom: "28px" }}>
              <label style={{
                color: "#374151",
                fontSize: "13px",
                fontWeight: 600,
                display: "block",
                marginBottom: "6px",
              }}>
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  background: "#f9fafb",
                  color: "#111827",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => e.target.style.borderColor = "#295F2D"}
                onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "8px",
                background: loading ? "#9ca3af" : "#295F2D",
                color: "white",
                border: "none",
                fontSize: "16px",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.2s",
              }}
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>

          <p style={{
            textAlign: "center",
            color: "#6b7280",
            fontSize: "14px",
            marginTop: "20px",
          }}>
            Already have an account?{" "}
            <span
              onClick={() => setScreen("signin")}
              style={{ color: "#295F2D", fontWeight: 600, cursor: "pointer" }}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpScreen;