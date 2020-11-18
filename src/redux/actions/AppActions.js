import * as types from './types'
import { getAppSetting, getNotilist } from '../../network/ApiRequest'
import database from '../../database/Database'

export const refreshNotiList = () => ({
  type: types.REFRESH_NOTI_LIST
})

export const refreshNotificationsSetting = () => ({
  type: types.REFRESH_NOTIFICATIONS_SETTING
})

export const refreshHistoryLog = () => ({
  type: types.REFRESH_HISTORY_LOG
})

export const refreshProfile = () => ({
  type: types.REFRESH_PROFILE
})

export const refreshNewBooking = () => ({
  type: types.REFRESH_NEW_BOOKING
})

export const listCountryChanged = list => ({
  type: types.LIST_COUNTRY,
  payload: list
})

export const getSetting = token => dispatch => {
  database.getSetting(setting => {
    console.log('setting ', setting)
    dispatch({ type: types.SETTING_CHANGED, data: setting })
  })
  getAppSetting(token, data => {
    if (data.success) {
      database.setSetting(data.data)
      dispatch({ type: types.SETTING_CHANGED, data: data.data })
    }
  })
}

export const getNotiNumber = token => dispatch => {
  getNotilist(token, 0, 1, response => {
    if (response.success) {
      dispatch({ type: types.NOTI_UNREAD_CHANGED, data: response.data.unread })
    }
  })
}
export const updateNotiNumber = newUnread => ({
  type: types.NOTI_UNREAD_CHANGED,
  data: newUnread
})

export const ownProps = data => ({
  type: types.OWN_PROPS,
  payload: data
})

export const menuChanged = menuName => ({
  type: types.MENU_CHANGED,
  payload: menuName
})

export const refreshBookingDetail = () => ({
  type: types.REFRESH_BOOKING_DETAIL
})