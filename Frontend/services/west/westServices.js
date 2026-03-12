const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const WEST_API_ENDPOINTS = {
  winter: {
    summary: `${BASE_URL}/west-winter/summary`,
    predict: `${BASE_URL}/west-winter/predict`,
  },

  premonsoon: {
    summary: `${BASE_URL}/west-premonsoon/summary`,
    predict: `${BASE_URL}/west-premonsoon/predict`,
  },

  monsoon: {
    summary: `${BASE_URL}/west-monsoon/summary`,
    predict: `${BASE_URL}/west-monsoon/predict`,
  },

  postmonsoon: {
    summary: `${BASE_URL}/west-postmonsoon/summary`,
    predict: `${BASE_URL}/west-postmonsoon/predict`,
  },
};