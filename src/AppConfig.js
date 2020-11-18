import { Dimensions, PixelRatio, Platform } from 'react-native'

const APP_PRODUCTION = false
const LOCAL_URL = 'https://url.com'
const DEV_URL = 'https://url.com'
const UAT_URL = 'https://url.com'
const PRO_URL = 'https://url.com'
const APP_URL = APP_PRODUCTION ? PRO_URL : DEV_URL

module.exports = {
  api: {
    production: APP_PRODUCTION,
    appUrl: APP_URL,
    appType: 'driver',
    xApiKey: 'ZAk0bEaJFDY056WGSOBP/+56Wdm4H2Xzrbz7tOTT+uo=',
    pageLimit: 20
  },
  pixel: 1.0 / PixelRatio.get(),
  version: '1.0.0',
  // version: require("../../package.json").version,
  isIphoneX:
    Platform.OS === 'ios' &&
    (Dimensions.get('window').height > 810 ||
      Dimensions.get('window').width > 810),
  // isIphoneX:
  //   Platform.OS === "ios" &&
  //   (Dimensions.get("window").height === 812 ||
  //     Dimensions.get("window").width === 812),
  // IP 5, IP SE
  isSmallPhone:
    Dimensions.get('window').height < 600 &&
    Dimensions.get('window').width < 350,
  isIOS: Platform.OS === 'ios',
  colors: {
    actionbar_color: '#364053',
    main_button_color: '#5294c8',
    border_color: '#87C7CB',
    primaryColor: '#78CCD0',
    primaryDarkColor: '#3ba5aa',
    container: '#F7F7FA',
    containerWhite: '#fff',
    darkgreen: '#01762F', // maincolor
    lightgreen: '#98CA7C',
    darkgreenPlaceHolder: 'rgba(2,118,47,0.5)',
    gray: '#848484',
    white: '#fff',
    blackText: '#222',
    whiteText: '#fff',
    apiSuccess: '#2E7D32',
    apiFail: '#C62828',
    row_seperator: '#e4e4e4',
    regularText: '#7F7F7F',
    greenText: '#84D5D9',
    viewBorder: '#DADEE3',
    spinerBorder: '#DBDBDB',
    colorInspection: '#b1e2e7',
    colorHolder: '#AAA'
  },
  dimensions: {
    screenWidth: Dimensions.get('window').width,
    screenHeight: Dimensions.get('window').height,
    statusBarHeight: (Platform.OS === 'ios' && (Dimensions.get('window').height > 810 || Dimensions.get('window').width > 810)) ? 24 : Platform.OS === 'ios' ? 20 : 0,
    sideBarWidth: Dimensions.get('window').width * 0.84,
    navbarHeight: (Platform.OS === 'ios' && (Dimensions.get('window').height > 810 || Dimensions.get('window').width > 810)) ? 88 : Platform.OS === 'ios' ? 64 : 54,
    actionbarSmall: 48,
    actionbarHeight: (Platform.OS === 'ios' && (Dimensions.get('window').height > 810 || Dimensions.get('window').width > 810)) ? 66 : 56,
    margin: 30,
    marginDefault: 10,
    radiusDefault: 10
  },
  time: {
    YEAR_FORMAT: 'YYYY',
    TIME_FORMAT: 'HH:mm',
    DATE_TIME_NORMAL_FORMAT: 'YYYY-MM-DD, HH:mm',
    TIMEZONE_SG: 'Asia/Singapore',
    SERVER_DATE_FORMAT: 'YYYY-MM-DD',
    SERVER_TIME_FORMAT: 'HH:mm:ss',
    SERVER_TIME_FORMAT12: 'hh:mm A',
    SERVER_DATE_TIME_FORMAT: 'YYYY-MM-DD HH:mm:ss',
    SHIFT_TIME_FORMAT: 'DD MMM YYYY',
    TIME_OVERDRIVE_FORMAT: 'YYYY-MM-DD\'T\'HH:mm:ssZ', // 2018-08-14T07:11:51Z
    OVERDRIVE_TIME_FORMAT: 'YYYY-MM-DDTHH:mm:ssZ'
  }
}
