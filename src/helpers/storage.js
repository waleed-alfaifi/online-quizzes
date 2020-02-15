export const setItemSession = (key, value) => {
  const stringfiedValue = JSON.stringify(value);
  sessionStorage.setItem(key, stringfiedValue);
};

export const getItemSession = key => {
  const parsedValue = JSON.parse(sessionStorage.getItem(key));
  return parsedValue;
};

export const setItem = (key, value) => {
  const stringfiedValue = JSON.stringify(value);
  localStorage.setItem(key, stringfiedValue);
};

export const getItem = key => {
  const parsedValue = JSON.parse(localStorage.getItem(key));
  return parsedValue;
};

export const removeItem = key => {
  localStorage.removeItem(key);
};
