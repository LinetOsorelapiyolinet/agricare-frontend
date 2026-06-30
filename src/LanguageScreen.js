import { useState } from "react";

function LanguageScreen() {
const [selected, setSelected] = useState("Yoruba");
const languages = ["Yoruba", "Hausa", "Igbo", "English"];

return (
<div style={{
backgroundColor: "#071407",
minHeight: "100vh",
display: "flex",
alignItems: "center",
justifyContent: "center",
fontFamily: "Inter, sans-serif",
}}>

<div style={{
width: 360,
backgroundColor: "#295F2D",
borderRadius: 40,
overflow: "hidden",
boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
}}>

{/* Back arrow */}
<div style={{ padding: "16px 22px 0", display: "flex", alignItems: "center", gap: 8 }}>
<span style={{ color: "white", fontSize: 22 }}>‹</span>
<span style={{ color: "white", fontSize: 13, fontWeight: 600 }}>
Change Language
</span>
</div>

{/* Content */}
<div style={{ padding: "20px 24px 44px" }}>

<p style={{
color: "rgba(255,255,255,0.7)",
fontSize: 13, margin: "0 0 20px",
}}>
Select your preferred Language:
</p>

{/* Language options */}
<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
{languages.map(lang => {
const sel = selected === lang;
return (
<div
key={lang}
onClick={() => setSelected(lang)}
style={{
display: "flex", alignItems: "center", gap: 14,
padding: "16px 18px", borderRadius: 12,
backgroundColor: sel
? "rgba(255,255,255,0.13)"
: "rgba(255,255,255,0.06)",
border: `1.5px solid ${sel ? "white" : "rgba(255,255,255,0.22)"}`,
cursor: "pointer",
}}>
<div style={{
width: 22, height: 22, borderRadius: "50%",
backgroundColor: sel ? "#08F071" : "transparent",
border: `2px solid ${sel ? "#08F071" : "rgba(255,255,255,0.45)"}`,
display: "flex", alignItems: "center",
justifyContent: "center",
color: "#295F2D", fontWeight: 900, fontSize: 12,
}}>
{sel ? "✓" : ""}
</div>
<span style={{ color: "white", fontSize: 14, fontWeight: 600 }}>
{lang}
</span>
</div>
);
})}
</div>

{/* Confirm Button */}
<button style={{
width: "100%", padding: "15px 0",
borderRadius: 10, marginTop: 30,
backgroundColor: "white", color: "#295F2D",
fontWeight: 700, fontSize: 15,
border: "none", cursor: "pointer",
}}>
Confirm
</button>

</div>

{/* Bottom Nav */}
<div style={{
display: "flex", justifyContent: "space-around",
padding: "10px 0 20px",
borderTop: "1px solid rgba(255,255,255,0.1)",
}}>
{["🏠", "❓", "👤", "🔔", "⚙️"].map((icon, i) => (
<span key={i} style={{
fontSize: 18, opacity: i === 0 ? 1 : 0.4,
cursor: "pointer",
}}>{icon}</span>
))}
</div>

</div>
</div>
);
}

export default LanguageScreen;