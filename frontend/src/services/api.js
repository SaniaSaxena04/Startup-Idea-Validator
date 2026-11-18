import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

export const extractStartupIdea = async (ideaPayload) => {
  try {
    const response = await apiClient.post('/api/ideas/extract', ideaPayload);
    return response.data;
  } catch (error) {
    if (error.response) {
      const detail = error.response.data?.detail;
      if (Array.isArray(detail)) {
        // Pydantic validation error array
        const formatted = detail.map((err) => `${err.loc.slice(-1)[0]}: ${err.msg}`).join(', ');
        throw new Error(formatted);
      }
      throw new Error(detail || `Server responded with status ${error.response.status}`);
    } else if (error.request) {
      throw new Error('Unable to reach the backend server. Ensure FastAPI is running on ' + API_BASE_URL);
    } else {
      throw new Error(error.message || 'An unexpected error occurred.');
    }
  }
};

export default apiClient;