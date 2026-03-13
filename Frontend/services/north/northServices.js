const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const NORTH_API_ENDPOINTS = {
  premonsoon: {
    summary: `${BASE_URL}/north-premonsoon/summary`,
    predict: `${BASE_URL}/north-premonsoon/predict`,
  },

  monsoon: {
    summary: `${BASE_URL}/north-monsoon/summary`,
    predict: `${BASE_URL}/north-monsoon/predict`,
  },

  postmonsoon: {
    summary: `${BASE_URL}/north-postmonsoon/summary`,
    predict: `${BASE_URL}/north-postmonsoon/predict`,
  },
};