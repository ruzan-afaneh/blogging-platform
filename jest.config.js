/** @type {import('jest').Config} */
const config = {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  testEnvironment: "jest-environment-jsdom",
};

module.exports = config;
