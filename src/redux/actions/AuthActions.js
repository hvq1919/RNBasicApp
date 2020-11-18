import * as types from './types'
import database from '../../database/Database'
import * as api from '../../network/ApiRequest'


export const tokenChanged = token => ({
  type: types.TOKEN_CHANGED,
  payload: token
})

export const profileChanged = profile => ({
  type: types.PROFILE_CHANGED,
  payload: profile
})

export const checkLogedin = (callback) => dispatch => {
  database.getProfile(profile => {
    dispatch({
      type: types.PROFILE_CHANGED,
      payload: profile
    })
  })
  database.getSessionToken(token => {
    dispatch({
      type: types.TOKEN_CHANGED,
      payload: token == null ? '' : token
    })
    console.log('=== AuthAction token:', token)
    if (token == null) {
      callback()
    } else {
      // Actions.reset('main')
      // Navigate to main
    }
  })
}

export const logOut = token => dispatch => {
  api.logout(token, response => {
    console.log('=== Logout', response)
  })

  database.setSessionToken('')
  database.setProfile(null)

  dispatch({
    type: types.TOKEN_CHANGED,
    payload: ''
  })
  // Actions.reset("login");
  // Reset to login

  dispatch({
    type: types.PROFILE_CHANGED,
    payload: null
  })
}
export const pushTokenChanged = token => ({
  type: types.PUSH_TOKEN_CHANGED,
  payload: token
})
