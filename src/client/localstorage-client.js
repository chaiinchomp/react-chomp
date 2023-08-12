export function get(key, initialValue, useSessionStorage = false) {
  try {
    let item;
    if (useSessionStorage) {
      item = window.sessionStorage.getItem(key);
    } else {
      item = window.localStorage.getItem(key);
    }
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.warn(error);
    return initialValue;
  }
}

export function update(key, value, setValueCallback = () => {}, useSessionStorage = false) {
  try {
    setValueCallback(value);
    if (useSessionStorage) {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } else {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.warn(error);
  }
}

export function remove(key, useSessionStorage = false) {
  try {
    if (useSessionStorage) {
      window.sessionStorage.removeItem(key);
    } else {
      window.localStorage.removeItem(key);
    }
  } catch (error) {
    console.warn(error);
  }
}

export function reset() {
  localStorage.clear();
}

export default {
  get,
  update,
  remove,
  reset,
};
