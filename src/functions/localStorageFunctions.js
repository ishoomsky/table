const lsKey = "app-data";

export const initLS = (_data, key = lsKey) => {
  const data = JSON.stringify(_data);
  if (localStorage.getItem(key) === null) {
    localStorage.setItem((key = lsKey), data);
  }
};

export const getLS = (key = lsKey) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setLS = (_data, key = lsKey) => {
  const data = JSON.stringify(_data);
  localStorage.setItem(key, data);
};
