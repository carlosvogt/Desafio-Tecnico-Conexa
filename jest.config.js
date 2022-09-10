module.exports = {
  preset: 'react-native',
  verbose: true,
  globals: {
    'js-jest': {
      babelConfig: true,
    },
  },
  setupFiles: ['<rootDir>/jest/setup.js'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1', '^~/(.*)$': '<rootDir>/$1' },
  testRegex:
    '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)|(\\.(test|spec))\\.(ts|tsx|js)$',
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(@react-native|react-native)/).*/(react-clone-referenced-element|@react-native-community|react-native-vector-icons|react-navigation|@react-navigation/.*|sentry-expo|native-base|react-native-code-push|@sentry/.*)',
  ],
  // setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '\\.snap$'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest/fileTransformer.js',
  },
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/coverage/**',
  ],
};
