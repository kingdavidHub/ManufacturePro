import axios from 'axios';

// Shared axios instance with a 60s timeout to handle cold starts
// (e.g. Render spinning up from sleep)
const api = axios.create({
  timeout: 60_000,
});

export default api;
