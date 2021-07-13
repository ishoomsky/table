const lsKey = "app-data-users";

// export const initLS = (_data, localStorageKey) => {
//   const data = JSON.stringify(_data);
//   if (localStorage.getItem(localStorageKey) === null) {
//     localStorage.setItem(localStorageKey, data);
//   }
// };

export const getLS = (localStorageKey) => {
  return JSON.parse(localStorage.getItem(localStorageKey));
};

export const setLS = (_data, localStorageKey) => {
  const data = JSON.stringify(_data);
  localStorage.setItem(localStorageKey, data);
};
