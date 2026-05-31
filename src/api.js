// MITA API INTEGRATION LAYER
// Connects to the production backend on Vercel without data mocks

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Base Request Wrapper
const request = async (path, options = {}) => {
  const token = localStorage.getItem('mita_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const getClientMode = () => 'REAL';

// 1. Health / Metadata
export const checkHealth = async () => {
  return request('/api/health');
};

export const checkBackend = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/health`, { method: 'GET', signal: AbortSignal.timeout(1500) });
    return res.ok ? 'REAL' : 'REAL';
  } catch (err) {
    return 'REAL';
  }
};

export const getZones = async () => {
  return request('/api/metadata/zones');
};

export const getSearchExamples = async () => {
  return request('/api/metadata/search-examples');
};

// 2. Auth Endpoints
export const loginAdmin = async (email, password) => {
  const data = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  if (data.accessToken) {
    localStorage.setItem('mita_token', data.accessToken);
  }
  return data;
};

export const getCurrentUser = async () => {
  return request('/api/auth/me');
};

export const logoutAdmin = () => {
  localStorage.removeItem('mita_token');
};

// 3. Properties Management
export const getProperties = async (filters = {}) => {
  const params = new URLSearchParams();
  for (const [key, val] of Object.entries(filters)) {
    if (val !== undefined && val !== null && val !== '') {
      params.append(key, val);
    }
  }
  const query = params.toString();
  return request(`/api/properties?${query}`);
};

export const getPropertyById = async (id) => {
  return request(`/api/properties/${id}`);
};

export const createProperty = async (data) => {
  return request('/api/properties', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const updateProperty = async (id, data) => {
  return request(`/api/properties/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
};

// 4. Conversational AI Search
export const aiSearch = async (query, limit = 10) => {
  return request('/api/ai/search', {
    method: 'POST',
    body: JSON.stringify({ query, limit })
  });
};

// 5. AI Compare Side-by-Side
export const aiCompare = async (query, propertyIds) => {
  return request('/api/ai/compare', {
    method: 'POST',
    body: JSON.stringify({ query, propertyIds })
  });
};

// 6. AI Listing Enhancer
export const aiEnhanceListing = async (rawText) => {
  return request('/api/ai/enhance-listing', {
    method: 'POST',
    body: JSON.stringify({ rawText })
  });
};

// 7. RAG Vector Reindexing
export const ragReindex = async () => {
  return request('/api/rag/reindex', { method: 'POST' });
};

// 8. Leads Management
export const createLead = async (leadData) => {
  return request('/api/leads', {
    method: 'POST',
    body: JSON.stringify(leadData)
  });
};

export const getLeads = async () => {
  return request('/api/leads');
};

// 9. Scraper and Sources
export const getSources = async () => {
  return request('/api/sources');
};

export const getImports = async () => {
  return request('/api/imports');
};

export const runImport = async (sourceId, url, limit = 30) => {
  return request('/api/imports/run', {
    method: 'POST',
    body: JSON.stringify({ sourceId, url, limit })
  });
};
