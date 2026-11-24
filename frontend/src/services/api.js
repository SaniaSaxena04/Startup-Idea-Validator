import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

const formatApiError = (error) => {
  if (error.response) {
    const detail = error.response.data?.detail;
    if (Array.isArray(detail)) {
      const formatted = detail.map((err) => `${err.loc.slice(-1)[0]}: ${err.msg}`).join(', ');
      return new Error(formatted);
    }
    return new Error(detail || `Server responded with status ${error.response.status}`);
  } else if (error.request) {
    return new Error('Unable to reach the backend server. Ensure FastAPI is running on ' + API_BASE_URL);
  }
  return new Error(error.message || 'An unexpected error occurred.');
};

export const extractStartupIdea = async (ideaPayload) => {
  try {
    const response = await apiClient.post('/api/ideas/extract', ideaPayload);
    return response.data;
  } catch (error) {
    throw formatApiError(error);
  }
};

export default apiClient;