export const get = (localStorageKey) => {
  return JSON.parse(localStorage.getItem(localStorageKey));
};

export const set = (_data, localStorageKey) => {
  const data = JSON.stringify(_data);
  localStorage.setItem(localStorageKey, data);
};

export const isLocalStorageEmpty = (localStorageKey) => {
  return (
    localStorage.getItem(localStorageKey) !== null &&
    localStorage.getItem(localStorageKey) !== undefined
  );
};
