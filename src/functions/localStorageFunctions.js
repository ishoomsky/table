export const initLS = (key, _data) => {
  const data = JSON.stringify(_data);

  localStorage.removeItem(key);
  localStorage.setItem(key, data);
};

export const getLS = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setLS = (key, data) => {
  localStorage.setItem(key, data);
};
