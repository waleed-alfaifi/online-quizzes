export const setItemSession = (key, value) => {
  const stringfiedValue = JSON.stringify(value);
  sessionStorage.setItem(key, stringfiedValue);
};

export const getItemSession = key => {
  try {
    const parsedValue = JSON.parse(sessionStorage.getItem(key));
    return parsedValue;
  } catch (error) {
    return null;
  }
};

export const setItem = (key, value) => {
  const stringfiedValue = JSON.stringify(value);
  localStorage.setItem(key, stringfiedValue);
};

export const getItem = key => {
  try {
    const parsedValue = JSON.parse(localStorage.getItem(key));
    return parsedValue;
  } catch (error) {
    return null;
  }
};

export const removeItem = key => {
  localStorage.removeItem(key);
};
