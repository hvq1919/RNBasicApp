import AppConfig from '../AppConfig'

const APP_URL = AppConfig.api.appUrl

const APP_TYPE = AppConfig.api.appType
const X_API_KEY = AppConfig.api.xApiKey
const LIMIT = AppConfig.api.pageLimit
const UNLIMIT = 1000
const USERLIMIT = 2000

const GOOGLE_KEY = "AIzaSyAIxpzdvA-lczSHEJUqqwUnHVrlPdilTJY" // Got it from AnhTran
const API_PLACE_AUTOCOMPLETE_URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?components=country:SG&key=${GOOGLE_KEY}&input=`;
const API_PLACE_DETAIL_URL = `https://maps.googleapis.com/maps/api/place/details/json?key=${GOOGLE_KEY}&fields=place_id,formatted_address,geometry&place_id=`;

const settingUrl = `${APP_URL}/api/v1/settings`
const loginUrl = `${APP_URL}/api/v1/login/dialog`
const checkLoginUrl = `${APP_URL}/api/v1/dialog?version=`
const loginFormUrl = `${APP_URL}/api/v1/login`
const logoutUrl = `${APP_URL}/api/v1/logout`
const deviceUrl = `${APP_URL}/api/v1/device`
const bookingListUrl = `${APP_URL}/api/v1/bookings?sort=bookings.created_at:desc&type=${APP_TYPE}&limit=${LIMIT}`
const dashboardStatisticUrl = `${APP_URL}/api/v1/bookings/dashboard-statistic`
const bookingDetailUrl = `${APP_URL}/api/v1/bookings`
const historyLogUrl = `${APP_URL}/api/v1/history-logs`
const expenseUrl =  `${APP_URL}/api/v1/expenses`
const sendMessageUrl = `${APP_URL}/api/v1/messages`
const getProfileUrl = `${APP_URL}/api/v1/profile`
const getListCountriesUrl = `${APP_URL}/api/v1/countries`
const getListVehicleTypeUrl = `${APP_URL}/api/v1/vehicle-types`
const getListProjectUrl = `${APP_URL}/api/v1/projects?sort=projects.created_at:desc&limit=${UNLIMIT}&offset=0&search=&filters[projects.status]=`
const createBookingUrl = `${APP_URL}/api/v1/bookings`
const updateBookingUrl = `${APP_URL}/api/v1/bookings`
const expenseTypeListUrl = `${APP_URL}/api/v1/expense-types`
const helpUrl = `${APP_URL}/api/v1/helps`
const notiUrl = `${APP_URL}/api/v1/notifications`
const getListUserUrl = `${APP_URL}/api/v1/users?sort=name:asc&limit=${UNLIMIT}&offset=0&search&filters[users.status]=&filters[users.role_id]=&permission=bookings.create`
const licencesUrl = `${APP_URL}/api/v1/licences`
const licencesClassUrl = `${APP_URL}/api/v1/licence-classes`
const getValidLicencesDriverUrl = `${APP_URL}/api/v1/licences/valid`
const getVehicleFieldUrl = `${APP_URL}/api/v1/vehicle_last_fields`

const getPersonalSettingUrl = `${APP_URL}/api/v1/settings/personal`
const updatePersonalSettingUrl = `${APP_URL}/api/v1/settings/personal`

const checkBookingUpdatedBeforeUrl = `${APP_URL}/api/v1/bookings/check-updated-before`

/// =========== Request API ==================== //

const checkLogAndShowError = (error, url, requestObject, callback) => {
  if (!url.includes('log')) {
    var ob = JSON.stringify(requestObject)
    var tokens = ob.split('token":"')
    if (tokens.length > 1) {

      var access_token = tokens[1].split('"')[0]
      //console.log("=== access: ", access_token);
      if (access_token) {
        logRms(
          access_token,
          0,
          'error',
          'Server error. Please try again. URL:' +
            url +
            ' - Request:' +
            JSON.stringify(requestObject) +
            (error ? ' - Error:' + error.toString() : ''),
          res => {
            console.log('=== .... Response Log Error: ', res)
          }
        )
      }
    }

    showErrorAlert(url, callback)
  }
}

const showErrorAlert = (url, callback) => {
  if (!url.includes('profile') && !url.includes('login')) {
    // Alert.alert("Server error. Please try again.");
  }
  callback({
    success: false,
    message: 'Server timeout. Please try again later.'
  })
}

const request = (url, requestObject, callback) => {
  console.log('== REQUEST', requestObject, url)
  console.log('== REQUEST global.internet', global.internet)
  if (global.internet) {
    fetch(url, requestObject)
      .then(response => {
        console.log('=== Response Not Parse yet : ', response)
        const statusCode = response.status
        const responseData = response.json()
        return Promise.all([statusCode, responseData]).then(res => ({
          statusCode: res[0],
          responseData: res[1]
        }))
      })
      .then(res => {
        console.log('==== RESPONSE URL', url, res)

        const { statusCode, responseData } = res
        if (statusCode == 422) {
          var message = ''
          Object.values(responseData.data).forEach(value => {
            message += value + '\n'
          })
          responseData['message'] = message
          callback(responseData, statusCode)
        } else if (!responseData.success && !responseData.message) {
          checkLogAndShowError(null, url, requestObject, callback)
        } else {
          callback(responseData, statusCode)
        }
      })
      .catch(error => {
        console.log('error', error)
        checkLogAndShowError(error, url, requestObject, callback)
      })
      .done()
  }
}

/// =========== Google Place Api =============== //

export const searchPlace = (text, callback) => {
  fetch(`${API_PLACE_AUTOCOMPLETE_URL}${text}`)
    .then((response) => response.json())
    .then((responseJson) => {
      callback(responseJson)
    })
    .catch((error) => {
      console.error(error);
    });
}

export const getPlaceDetail = (placeId, callback) => {
  fetch(`${API_PLACE_DETAIL_URL}${placeId}`)
    .then((response) => response.json())
    .then((responseJson) => {
      callback(responseJson)
    })
    .catch((error) => {
      console.error(error);
    });
}

export const getValidLicencesDrive = (token, driverId, endDate, callback) => {
  request(
    `${getValidLicencesDriverUrl}?user_id[]=${driverId}&end_date=${endDate}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': `Bearer ${token}`,
        'X-Api-Key': X_API_KEY
      }
    },
    callback
  )
}

/// =========== App Api =============== //


export const getAppSetting = (token, callback) => {
  request(
    `${settingUrl}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': `Bearer ${token}`,
        'X-Api-Key': X_API_KEY
      }
    },
    callback
  )
}

export const login = (account, device, callback) => {
  account['device'] = device
  request(
    loginUrl,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': X_API_KEY
      },
      body: JSON.stringify(account)
    },
    callback
  )
}

export const checkLogin = (version, callback) => {
  console.log("=== CheckLogin")
  request(`${checkLoginUrl}${version}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': X_API_KEY
      }
    },
    callback
  )
}

export const loginForm = (account, device, callback) => {
  account['device'] = device
  request(
    loginFormUrl,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': X_API_KEY
      },
      body: JSON.stringify(account)
    },
    callback
  )
}

export const logout = (token, callback) => {
  request(
    logoutUrl,
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': `Bearer ${token}`,
        'X-Api-Key': X_API_KEY
      }
    },
    callback
  );
};

export const updatePushToken = (token, data , callback) => {
  request(
    deviceUrl,
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': `Bearer ${token}`,
        'X-Api-Key': X_API_KEY
      },
      body: JSON.stringify({device: data})
    },
    callback
  );
}

export const getBookingList = (token, search, filters, page, callback) => {
  let offset = page * LIMIT;
  // &limit=5&offset=0&search=&filters[bookings.status]=
  request(
    `${bookingListUrl}&search=${search}&start_time=&end_time=&${filters}&offset=${offset}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': `Bearer ${token}`,
        'X-Api-Key': X_API_KEY
      }
    },
    callback
  )
}

export const getTodayBooking = (token, offset, callback) => {
  // &limit=5&offset=0&search=&filters[bookings.status]=
  request(
    `${bookingListUrl}&search=&start_time=${moment()
      .startOf('day')
      .format('YYYY-MM-DD HH:mm:ss')}&end_time=${moment()
      .endOf('day')
      .format(
        'YYYY-MM-DD HH:mm:ss'
      )}&filters[bookings.status]=&offset=${offset}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': `Bearer ${token}`,
        'X-Api-Key': X_API_KEY
      }
    },
    callback
  )
}

export const getDashBoardStatistic = (token, userType, callback) => {
  //admin , requestor , driver

  // &limit=5&offset=0&search=&filters[bookings.status]=
  request(
    `${dashboardStatisticUrl}?user_type=${userType}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': `Bearer ${token}`,
        'X-Api-Key': X_API_KEY
      }
    },
    callback
  );
};

export const getBookingDetail = (token, bookingId, callback) => {
  request(
    `${bookingDetailUrl}/${bookingId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Token": `Bearer ${token}`,
        "X-Api-Key": X_API_KEY
      }
    },
    callback
  );
}

export const getHistoryLog = (token, bookingId, callback) => {
  request(
    `${historyLogUrl}?sort=bookings.created_at:desc&limit=0&offset=0&search=&booking_id=${bookingId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Token": `Bearer ${token}`,
        "X-Api-Key": X_API_KEY
      }
    },
    callback
  );
}
export const sendMessage = (token, bookingId, message, callback) => {
  request(
    `${sendMessageUrl}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': `Bearer ${token}`,
        'X-Api-Key': X_API_KEY
      },
      body: JSON.stringify({booking_id: bookingId, message: message})
    },
    callback
  )
}

export const addExpense = (token, data, callback) => {
  request(
    `${expenseUrl}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': `Bearer ${token}`,
        'X-Api-Key': X_API_KEY
      },
      body: JSON.stringify(data)
    },
    callback
  )
}

export const deleteExpense = (token, historyId, expenseId, callback) => {
  request(
    `${expenseUrl}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': `Bearer ${token}`,
        'X-Api-Key': X_API_KEY
      },
      body: JSON.stringify({id: expenseId, log_id: historyId})
    },
    callback
  )
}

export const getProfile = (token, callback) => {
  request(
    `${getProfileUrl}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': `Bearer ${token}`,
        'X-Api-Key': X_API_KEY
      }
    },
    callback
  )
}

export const getListCountries = (token, callback) => {
  request(
    `${getListCountriesUrl}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': `Bearer ${token}`,
        'X-Api-Key': X_API_KEY
      }
    },
    callback
  )
}

export const updateProfile = (token, data, callback) => {
  request(
    `${getProfileUrl}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': `Bearer ${token}`,
        'X-Api-Key': X_API_KEY
      },
      body: JSON.stringify(data)
    },
    callback
  )
}

export const getListVehicleType = (token, callback) => {
  request(
    `${getListVehicleTypeUrl}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': `Bearer ${token}`,
        'X-Api-Key': X_API_KEY
      }
    },
    callback
  )
}

export const getListProject = (token, callback) => {
  request(
    `${getListProjectUrl}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': `Bearer ${token}`,
        'X-Api-Key': X_API_KEY
      }
    },
    callback
  )
}

export const createBooking = (token, data, callback) => {
  request(
    `${createBookingUrl}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': `Bearer ${token}`,
        'X-Api-Key': X_API_KEY
      },
      body: JSON.stringify(data)
    },
    callback
  )
}

export const updateBooking = (token, bookingId ,data, callback) => {
  request(
    `${updateBookingUrl}/${bookingId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': `Bearer ${token}`,
        'X-Api-Key': X_API_KEY
      },
      body: JSON.stringify(data)
    },
    callback
  )
}

export const getExpenseTypeList = (token, callback) => {
  request(
    `${expenseTypeListUrl}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Token': `Bearer ${token}`,
          'X-Api-Key': X_API_KEY
        }
      },
    callback
  )
}

export const getHelpInfo = (token, callback) => {
  request(
    `${helpUrl}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Token': `Bearer ${token}`,
          'X-Api-Key': X_API_KEY
        }
      },
    callback
  )
}

export const getNotilist = (token, limit , offset, callback) => {
  request(
    `${notiUrl}?limit=${limit}&offset=${offset}&search&filters[notifications.status]`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Token': `Bearer ${token}`,
          'X-Api-Key': X_API_KEY
        }
      },
    callback
  )
}
export const readNoti = (token, notiId, callback) => {
  request(
    `${notiUrl}/read-one/${notiId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Access-Token': `Bearer ${token}`,
          'X-Api-Key': X_API_KEY
        }
      },
    callback
  )
}
export const readAllNoti = (token, callback) => {
  request(
    `${notiUrl}/read-all`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Access-Token': `Bearer ${token}`,
          'X-Api-Key': X_API_KEY
        }
      },
    callback
  )
}

export const deleteLicences = (token, licence_id, user_id, callback) => {
  request(
    `${licencesUrl}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': `Bearer ${token}`,
        'X-Api-Key': X_API_KEY
      },
      body: JSON.stringify({licence_id: licence_id, user_id: user_id})
    },
    callback
  )
}

export const getLicenceClass = (token, callback) => {
  request(
    `${licencesClassUrl}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Token': `Bearer ${token}`,
          'X-Api-Key': X_API_KEY
        }
      },
    callback
  )
}

export const addLicences = (token, user_id, licence_code, licence_class, licence_expiry, user_files, callback) => {
  request(
    `${licencesUrl}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': `Bearer ${token}`,
        'X-Api-Key': X_API_KEY
      },
      body: JSON.stringify({user_id: user_id, licence_code: licence_code, licence_class: licence_class, licence_expiry: licence_expiry, user_files: user_files })
    },
    callback
  )
}

export const getVehicleField = (token, id, callback) => {
  request(
    `${getVehicleFieldUrl}?id=${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': `Bearer ${token}`,
        'X-Api-Key': X_API_KEY
      }
    },
    callback
  )
}

export const getPersonalSetting = (token, callback) => {
    request(
        `${getPersonalSettingUrl}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Access-Token': `Bearer ${token}`,
                'X-Api-Key': X_API_KEY
            }
        },
        callback
    )
}

export const updatePersonalSetting = (token, data, callback) => {
    request(
        `${updatePersonalSettingUrl}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Token': `Bearer ${token}`,
                'X-Api-Key': X_API_KEY
            },
            body: JSON.stringify(data)
        },
        callback
    )
}

export const getListUser = (token, callback) => {
  request(
    `${getListUserUrl}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': `Bearer ${token}`,
        'X-Api-Key': X_API_KEY
      }
    },
    callback
  )
}

export const checkBookingUpdatedBefore = (token, id, updated_at, callback) => {
  request(
    `${checkBookingUpdatedBeforeUrl}?id=${id}&updated_at=${updated_at}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': `Bearer ${token}`,
        'X-Api-Key': X_API_KEY
      }
    },
    callback
  )
}
