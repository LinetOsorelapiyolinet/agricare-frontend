const API_URL = "https://agricare-backend.onrender.com/api";

export const api = {

    signUp: async (name, email, password) => {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    return response.json();
  },

  signIn: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  getCases: async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/cases`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  createCase: async (caseData) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/cases`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(caseData),
    });
    return response.json();
  },

  updateCase: async (id, data) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/cases/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },


  getMessages: async (chatId) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/messages/${chatId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  sendMessage: async (chatId, from, text) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ chatId, from, text }),
    });
    return response.json();
  },

  getFarmers: async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/farmers`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  updateSettings: async (settings) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/settings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(settings),
    });
    return response.json();
  },

 
  checkHealth: async () => {
    const response = await fetch(`${API_URL}/health`);
    return response.json();
  },
};