export const getLS = (localStorageKey) => {
  return JSON.parse(localStorage.getItem(localStorageKey));
};

export const setLS = (_data, localStorageKey) => {
  const data = JSON.stringify(_data);
  localStorage.setItem(localStorageKey, data);
};
