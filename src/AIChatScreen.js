import { useState } from "react";

function AIChatScreen() {
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hello! I'm Agricare AI. How can I help you with your poultry today? 🐔" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "farmer", text: input }]);
    setInput("");

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        from: "ai", 
        text: "Thanks for your question! Based on what you described, I recommend checking their drinking water and ensuring they have proper ventilation. Can you tell me more about their symptoms?" 
      }]);
    }, 1000);
  };

  return (
    <div style={{
      background: "linear-gradient(135deg, #071407 0%, #1a3a1a 100%)",
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
        height: "700px",
        backgroundColor: "white",
        borderRadius: "32px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
      }}>
        
        <div style={{
          background: "linear-gradient(135deg, #295F2D, #071407)",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}>
          <button onClick={() => window.location.reload()} style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "20px",
            cursor: "pointer",
          }}>←</button>
          <div>
            <h3 style={{ color: "white", margin: 0, fontSize: "16px" }}>🤖 Agricare AI</h3>
            <p style={{ color: "rgba(255,255,255,0.6)", margin: 0, fontSize: "11px" }}>Online • AI-powered assistant</p>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          padding: "20px",
          overflowY: "auto",
          backgroundColor: "#f5f8f5",
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: msg.from === "ai" ? "flex-start" : "flex-end",
              marginBottom: "12px",
            }}>
              <div style={{
                maxWidth: "80%",
                padding: "12px 16px",
                borderRadius: msg.from === "ai" ? "16px 16px 16px 4px" : "16px 16px 4px 16px",
                backgroundColor: msg.from === "ai" ? "white" : "#295F2D",
                color: msg.from === "ai" ? "#071407" : "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                fontSize: "14px",
                lineHeight: 1.5,
              }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          padding: "16px 20px",
          backgroundColor: "white",
          borderTop: "1px solid #e8ece8",
          display: "flex",
          gap: "10px",
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Describe your poultry issue..."
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: "12px",
              border: "1px solid #e8ece8",
              fontSize: "14px",
              outline: "none",
              fontFamily: "Inter, sans-serif",
            }}
          />
          <button onClick={sendMessage} style={{
            padding: "12px 20px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #295F2D, #071407)",
            color: "white",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: 600,
          }}>
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIChatScreen;