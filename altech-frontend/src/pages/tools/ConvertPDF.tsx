import  { useState } from "react";

const ConvertPDF = () => {
  const [from, setFrom] = useState("pdf");
  const [to, setTo] = useState("jpeg");

  return (
    <div>
      <h2>Convertor PDF</h2>
      <p>Selectează tipurile de fișiere pentru conversie.</p>

      <label>Din:</label>
      <select value={from} onChange={(e) => setFrom(e.target.value)}>
        <option value="pdf">PDF</option>
        <option value="jpeg">JPEG</option>
        <option value="ppt">PowerPoint</option>
        <option value="doc">Word</option>
        <option value="xls">Excel</option>
      </select>

      <label style={{ marginLeft: "1rem" }}>În:</label>
      <select value={to} onChange={(e) => setTo(e.target.value)}>
        <option value="pdf">PDF</option>
        <option value="jpeg">JPEG</option>
        <option value="ppt">PowerPoint</option>
        <option value="doc">Word</option>
        <option value="xls">Excel</option>
      </select>

      <div style={{ marginTop: "1rem" }}>
        <input type="file" />
        <button style={{ marginLeft: "1rem" }}>Convertește</button>
      </div>
    </div>
  );
};

export default ConvertPDF