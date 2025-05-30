import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";


const Create = () => {
  const [urlBlob, setUrlBlob] = useState<string | null>(null);
  const [type, setType] = useState<string>("text");
  const [formData, setFormData] = useState<any>({});
  const [pdfUrl, setPdfUrl] = useState<string>("");

  useEffect(() => {
    // Resetare URL când se schimbă tipul
    setUrlBlob(null);
    setPdfUrl("");
    setFormData({});
  }, [type]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const endpointMap: any = {
    text: "http://localhost:8000/api/create/free/basic/",
    image: "http://localhost:8000/api/create/free/image/",
    table: "http://localhost:8000/api/create/free/table/",
    advancedtable: "http://localhost:8000/api/create/pro/advanced-table/",
    contract: "http://localhost:8000/api/create/pro/contract/",
    invoice: "http://localhost:8000/api/create/pro/invoice/",
    multiimage: "http://localhost:8000/api/create/pro/multi-image-pdf/",
    sign: "http://localhost:8000/api/create/pro/sign-pdf/",
  };

  const generate = async () => {
    setUrlBlob(null); // Resetăm URL-ul

    const url = endpointMap[type];
    const isFileUpload = ["image", "sign", "multiimage"].includes(type);

    let data: any = isFileUpload ? new FormData() : {};

    for (let key in formData) {
      if (isFileUpload) {
        data.append(key, formData[key]);
      } else {
        data[key] = formData[key];
      }
    }

    try {
      const res = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          ...(isFileUpload ? { "Content-Type": "multipart/form-data" } : {}),
        },
        responseType: "blob",
      });

      const blob = new Blob([res.data], { type: "application/pdf" });
      const generatedUrl = URL.createObjectURL(blob);
      setUrlBlob(generatedUrl);
      setPdfUrl(generatedUrl);
    } catch (err) {
      console.error("Eroare la generare:", err);
    }
  };

  return (
    <div>
      <h2>Crează un document PDF</h2>

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="text">Text simplu</option>
        <option value="image">Text + imagine</option>
        <option value="table">Tabel simplu</option>
        <option value="advancedtable">Tabel avansat</option>
        <option value="multiimage">Imagini multiple</option>
        <option value="contract">Contract</option>
        <option value="invoice">Factură</option>
        <option value="sign">Semnare PDF</option>
      </select>

      <div style={{ marginTop: "1rem" }}>
        {type === "text" && (
          <>
            <input name="title" placeholder="Titlu" onChange={handleInputChange} />
            <textarea name="content" placeholder="Conținut" onChange={handleInputChange} />
          </>
        )}

        {type === "image" && (
          <>
            <input name="title" placeholder="Titlu" onChange={handleInputChange} />
            <textarea name="content" placeholder="Conținut" onChange={handleInputChange} />
            <input type="file" name="image" onChange={handleFileChange} />
          </>
        )}

        {type === "table" && (
          <>
            <input name="title" placeholder="Titlu tabel" onChange={handleInputChange} />
            <textarea name="headers" placeholder='["Col1", "Col2"]' onChange={handleInputChange} />
            <textarea name="rows" placeholder='[["Val1", "Val2"]]' onChange={handleInputChange} />
          </>
        )}

        {type === "advancedtable" && (
          <>
            <input name="title" placeholder="Titlu tabel avansat" onChange={handleInputChange} />
            <textarea name="headers" placeholder='["Serviciu", "Preț", "Cantitate"]' onChange={handleInputChange} />
            <textarea name="rows" placeholder='[["Montaj", "100", "2"]]' onChange={handleInputChange} />
            <input name="total" placeholder="Total" onChange={handleInputChange} />
          </>
        )}

        {type === "contract" && (
          <>
            <input name="client_name" placeholder="Client" onChange={handleInputChange} />
            <input name="date" type="date" onChange={handleInputChange} />
            <input name="service" placeholder="Serviciu" onChange={handleInputChange} />
            <input name="price" placeholder="Preț" type="number" onChange={handleInputChange} />
            <textarea name="terms" placeholder="Termeni" onChange={handleInputChange} />
          </>
        )}

        {type === "invoice" && (
          <>
            <input name="client_name" placeholder="Client" onChange={handleInputChange} />
            <input name="date" type="date" onChange={handleInputChange} />
            <textarea name="services" placeholder='[["Serviciu1", 100], ["Serviciu2", 200]]' onChange={handleInputChange} />
            <input name="total" placeholder="Total" onChange={handleInputChange} />
          </>
        )}

        {type === "sign" && (
          <>
            <input type="file" name="pdf" onChange={handleFileChange} />
            <input type="file" name="signature" onChange={handleFileChange} />
            <input type="number" name="x" placeholder="x" onChange={handleInputChange} />
            <input type="number" name="y" placeholder="y" onChange={handleInputChange} />
          </>
        )}
      </div>

      <button onClick={generate}>Generează PDF</button>

      {pdfUrl && (
        <div style={{ marginTop: "1rem" }}>
          <a href={pdfUrl} target="_blank" rel="noreferrer">
            Descarcă PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default Create;