const getItem = (name) => {
  return JSON.parse(localStorage.getItem(name));
};

const saveItem = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
  return getItem(name);
};

const deleteItem = (name) => {
  localStorage.removeItem(name);
};

const LocalStorage = {
  getItem: getItem,
  saveItem: saveItem,
  deleteItem: deleteItem,
};

export default LocalStorage;
