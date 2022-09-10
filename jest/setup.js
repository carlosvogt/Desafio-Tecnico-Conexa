import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native-config', () => ({
  getConstants: jest.fn(),
}));

jest.mock('react-native-vector-icons', () => 'Icon');

jest.mock('@react-navigation/native', () => ({
  DefaultTheme: {},
  useNavigation: jest.fn().mockReturnValue({
    navigate: jest.fn(),
    canGoBack: jest.fn().mockReturnValue(true),
    goBack: jest.fn(),
  }),
  useRoute: jest.fn().mockReturnValue({
    params: jest.fn(),
  }),
  createNavigatorFactory: jest.fn(),
  useIsFocused: jest.fn(),
}));

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: jest.fn(),
}));



jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn((...args) => Promise.resolve(args)),
  getItem: jest.fn((...args) => Promise.resolve(args)),
  removeItem: jest.fn((...args) => Promise.resolve(args)),
}));

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');



jest.mock('react-redux', () => {
  const real = jest.requireActual('react-redux');
  return {
    ...real,
    useSelector: jest.fn(),
    useDispatch: jest.fn(() => {}),
  };
});

jest.mock('react-native-paper');

