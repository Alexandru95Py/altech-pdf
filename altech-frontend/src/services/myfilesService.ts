import axios from "axios";

const BASE_URL = "http://localhost:8000/api/myfiles/base";

// 1. Obține fișierele salvate
export const fetchMyFiles = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 2. Încarcă un fișier PDF
export const uploadPDF = async (file: File, token: string) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${BASE_URL}/upload/`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// 3. Șterge un fișier
export const deleteFile = async (id: number, token: string) => {
  const response = await axios.delete(`${BASE_URL}/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// 4. Încarcă un fișier PDF rezultat din ștergerea de pagini
export const uploadPDFToDeletePages = async (
  formData: FormData,
  token: string
) => {
  const response = await axios.post(`${BASE_URL}/delete-pages/`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};