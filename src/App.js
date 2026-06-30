import { useState } from "react";
import VetDashboard from "./VetDashboard";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import logo from "./assets/logo.jpeg";

function App() {
  const [screen, setScreen] = useState("splash");

  if (screen === "vetdashboard") return <VetDashboard setScreen={setScreen} />;
  if (screen === "signin") return <SignInScreen setScreen={setScreen} />;
  if (screen === "signup") return <SignUpScreen setScreen={setScreen} />;

  return (
    <div style={{
      background: "linear-gradient(135deg, #071407 0%, #1a3a1a 50%, #295F2D 100%)",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Inter, sans-serif",
      padding: "20px",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "420px",
        backgroundColor: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        borderRadius: "48px",
        padding: "40px 32px",
        boxShadow: "0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{
          textAlign: "center",
          marginBottom: "32px",
        }}>
          <img
            src={logo}
            alt="AGRICARE Logo"
            style={{
              width: "100px",
              height: "100px",
              display: "block",
              margin: "0 auto 8px",
              objectFit: "contain",
            }}
          />
          <h1 style={{
            color: "white",
            fontSize: "32px",
            fontWeight: 800,
            letterSpacing: "4px",
            margin: 0,
            textShadow: "0 2px 20px rgba(0,0,0,0.3)",
          }}>AGRICARE</h1>
          <p style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "14px",
            margin: "8px 0 0",
            letterSpacing: "0.5px",
          }}>
            Real-time response, every second counts.
          </p>
        </div>

        <div style={{
          display: "flex",
          gap: "12px",
        }}>
          <button onClick={() => setScreen("signin")} style={{
            flex: 1,
            padding: "16px 0",
            borderRadius: "14px",
            background: "white",
            border: "none",
            color: "#295F2D",
            fontSize: "16px",
            fontWeight: 700,
            cursor: "pointer",
          }}>
            Sign In
          </button>
          <button onClick={() => setScreen("signup")} style={{
            flex: 1,
            padding: "16px 0",
            borderRadius: "14px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "white",
            fontSize: "16px",
            fontWeight: 600,
            cursor: "pointer",
          }}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;