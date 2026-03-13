const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const NORTH_API_ENDPOINTS = {
  monsoon: {
    summary: `${BASE_URL}/north-monsoon/summary`,
    predict: `${BASE_URL}/north-monsoon/predict`,
  },

  postmonsoon: {
    summary: `${BASE_URL}/north-postmonsoon/summary`,
    predict: `${BASE_URL}/north-postmonsoon/predict`,
  },
};