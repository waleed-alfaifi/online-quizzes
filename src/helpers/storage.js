/**
 * 
 * @param {string} key 
 * @param {*} value 
 */
export const setItemSession = (key, value) => {
  const stringfiedValue = JSON.stringify(value);
  sessionStorage.setItem(key, stringfiedValue);
};

/**
 * 
 * @param {string} key 
 * @returns {*}
 */
export const getItemSession = key => {
  try {
    const parsedValue = JSON.parse(sessionStorage.getItem(key));
    return parsedValue;
  } catch (error) {
    return null;
  }
};

/**
 * 
 * @param {string} key 
 * @param {*} value 
 */
export const setItem = (key, value) => {
  const stringfiedValue = JSON.stringify(value);
  localStorage.setItem(key, stringfiedValue);
};

/**
 * 
 * @param {string} key 
 * @returns {*}
 */
export const getItem = key => {
  try {
    const parsedValue = JSON.parse(localStorage.getItem(key));
    return parsedValue;
  } catch (error) {
    return null;
  }
};

/**
 * 
 * @param {string} key 
 */
export const removeItem = key => {
  localStorage.removeItem(key);
};
