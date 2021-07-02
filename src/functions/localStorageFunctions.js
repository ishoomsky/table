const lsKey = "app-data";

export const initLS = (_data) => {
  const data = JSON.stringify(_data);
  if (localStorage.getItem(lsKey) === null) {
    localStorage.setItem(lsKey, data);
  }
};

export const getLS = () => {
  return JSON.parse(localStorage.getItem(lsKey));
};

export const setLS = (_data) => {
  const data = JSON.stringify(_data);
  localStorage.setItem(lsKey, data);
};
