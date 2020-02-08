export const setItemSession = (key, value) => {
  const stringfiedValue = JSON.stringify(value);
  sessionStorage.setItem(key, stringfiedValue);
};

export const getItemSession = key => {
  const parsedValue = JSON.parse(sessionStorage.getItem(key));
  return parsedValue;
};
