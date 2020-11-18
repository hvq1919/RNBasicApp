import {
    TOKEN_CHANGED,
    PROFILE_CHANGED,
    PUSH_TOKEN_CHANGED,
    REFRESH_HISTORY_LOG,
    SETTING_CHANGED,
    OWN_PROPS,
    NOTI_UNREAD_CHANGED,
    REFRESH_NOTI_LIST,
    REFRESH_BOOKING_DETAIL,
    REFRESH_PROFILE,
    REFRESH_NEW_BOOKING
  } from '../actions/types'
  
  const INITIAL_STATE = {
    refreshHistoryLog: 0,
    refreshNotiList: 0,
    refreshBookingDetail: 0,
    refreshProfile: 0,
    refreshNewBooking: 0,
    setting: null,
    ownProps: null,
    unReadNoti: 0,
    token: '',
    profile: null,
    pushToken: ''
  }
  
  export default (state = INITIAL_STATE, action) => {
    console.log('action', action)
    switch (action.type) {
      case TOKEN_CHANGED:
        return { ...state, token: action.payload }
      case PROFILE_CHANGED:
        return { ...state, profile: action.payload }
      case PUSH_TOKEN_CHANGED:
        return { ...state, pushToken: action.payload }
      case REFRESH_HISTORY_LOG:
        let newData = state.refreshHistoryLog + 1
        return { ...state, refreshHistoryLog: newData }
      case REFRESH_NOTI_LIST:
        let newDataNotilist = state.refreshNotiList + 1
        return { ...state, refreshNotiList: newDataNotilist }
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
      default:
        return { ...state }
    }
  }
  