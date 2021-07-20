export const get = (localStorageKey) => {
  return JSON.parse(localStorage.getItem(localStorageKey));
};

export const set = (_data, localStorageKey) => {
  const data = JSON.stringify(_data);
  localStorage.setItem(localStorageKey, data);
};

export const isLocalStorageNotEmpty = (localStorageKey) => {
  return localStorage.getItem(localStorageKey) ? true : false;
};
