import React, { useState } from "react";

const AiChat = () => {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState<string[]>([]);

  const handleSubmit = () => {
    if (!message.trim()) return;

    // Adăugăm răspunsul simulat
    setResponses((prev) => [...prev, `AI: (simulat) răspuns la: "${message}"`]);
    setMessage("");
  };

  return (
    <div>
      <h2>Asistentul tău AI 🤖</h2>
      <div style={{ margin: "1rem 0" }}>
        {responses.map((r, i) => (
          <p key={i} style={{ background: "#f0f0f0", padding: "0.5rem", borderRadius: "6px" }}>{r}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Scrie o întrebare..."
        style={{ padding: "0.5rem", width: "70%", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <button onClick={handleSubmit} style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}>
        Trimite
      </button>
    </div>
  );
};

export default AiChat;