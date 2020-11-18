import {
    LIST_COUNTRY,
    MENU_CHANGED,
    NOTI_UNREAD_CHANGED,
    OWN_PROPS,
    REFRESH_BOOKING_DETAIL,
    REFRESH_HISTORY_LOG,
    REFRESH_NEW_BOOKING,
    REFRESH_NOTI_LIST,
    REFRESH_NOTIFICATIONS_SETTING,
    REFRESH_PROFILE,
    SETTING_CHANGED
  } from '../actions/types'
  
  const INITIAL_STATE = {
    refreshHistoryLog: 0,
    refreshNotiList: 0,
    refreshNotificationsSetting: 0,
    refreshBookingDetail: 0,
    refreshProfile: 0,
    refreshNewBooking: 0,
    setting: null,
    ownProps: null,
    unReadNoti: 0,
    listCountry: []
  }
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case REFRESH_HISTORY_LOG:
        let newData = state.refreshHistoryLog + 1
        return { ...state, refreshHistoryLog: newData }
      case REFRESH_NOTI_LIST:
        let newDataNotilist = state.refreshNotiList + 1
        return { ...state, refreshNotiList: newDataNotilist }
      case REFRESH_NOTIFICATIONS_SETTING:
        let refreshNotificationsSetting = state.refreshNotificationsSetting + 1
        return {
          ...state,
          refreshNotificationsSetting: refreshNotificationsSetting
        }
      case SETTING_CHANGED:
        return { ...state, setting: action.data }
      case OWN_PROPS:
        return { ...state, ownProps: action.payload }
      case NOTI_UNREAD_CHANGED:
        return { ...state, unReadNoti: action.data }
      case REFRESH_BOOKING_DETAIL:
        let newDataBookingDetail = state.refreshBookingDetail + 1
        return { ...state, refreshBookingDetail: newDataBookingDetail }
      case REFRESH_PROFILE:
        let refreshProfile = state.refreshProfile + 1
        return { ...state, refreshProfile: refreshProfile }
      case REFRESH_NEW_BOOKING:
        let refreshNewBooking = state.refreshNewBooking + 1
        return { ...state, refreshNewBooking: refreshNewBooking }
      case LIST_COUNTRY:
        return { ...state, listCountry: action.payload }
      case MENU_CHANGED:
        return { ...state, menuName: action.payload }
      default:
        return { ...state }
    }
  }
  