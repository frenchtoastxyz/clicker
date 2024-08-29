export const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomType = (types) => types[getRandomNumber(0, types.length - 1)];

export const updateDisplay = (selector, value) => $(selector).text(value);

export const localStorageGet = (key, defaultValue) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
};

export const localStorageSet = (key, value) => localStorage.setItem(key, JSON.stringify(value));
