export const UserRole = {
  Admin: 0,
  Editor: 1,
};

/*
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = 'menu-default';

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = 'en';
export const localeOptions = [
  { id: 'en', name: 'English - LTR', direction: 'ltr' },
  { id: 'es', name: 'Español', direction: 'ltr' },
  { id: 'enrtl', name: 'English - RTL', direction: 'rtl' },
];

export const firebaseConfig = {
  apiKey: 'AIzaSyDKa6PKVpdMKetTr1-FSTmVg7KV8aSzrsY',
  authDomain: 'alaordenapp-a32ff.firebaseapp.com',
  projectId: 'alaordenapp-a32ff',
  storageBucket: 'alaordenapp-a32ff.appspot.com',
  messagingSenderId: '900499647086',
  appId: '1:900499647086:web:575423377d6bfbcf4f947f',
  measurementId: 'G-K1XMLR4V6Q',
};

export const userLoginUrl = '/app/tienda/categorias';
export const errorUrl = '/error';
export const adminRoot = '/app';
export const buyUrl = 'https://1.envato.market/k4z0';
export const loginUrl = `usuarios/login`;
export const searchPath = `${adminRoot}/#`;
export const servicePath = 'https://api.coloredstrategies.com';

export const currentUser = {
  id: 1,
  title: 'Sarah Kortney',
  img: '/assets/img/profiles/l-1.jpg',
  date: 'Last seen today 15:24',
  role: UserRole.Admin,
};

export const themeColorStorageKey = '__theme_selected_color';
export const isMultiColorActive = true;
export const defaultColor = 'light.purplemonster';
export const isDarkSwitchActive = true;
export const defaultDirection = 'ltr';
export const themeRadiusStorageKey = '__theme_radius';
export const isAuthGuardActive = true;
export const colors = [
  'bluenavy',
  'blueyale',
  'blueolympic',
  'greenmoss',
  'greenlime',
  'purplemonster',
  'orangecarrot',
  'redruby',
  'yellowgranola',
  'greysteel',
];
