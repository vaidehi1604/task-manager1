
//constants and functions
import { convertObjToQueryString } from '../utils/common'
import { BASE_URLS, LOGGED_IN_USER_DATA, USER_ACCESS_TOKEN_KEY } from '../constants/appConstants'

//componets
import Toast from 'src/utils/toast'
import authConfig from 'src/configs/auth'
import { toastErrorMessage } from 'src/constants/messages/admin'
import { axiosInstance } from './apiInterceptors'

export const api = async ({
  endpoint,
  payloadData,
  id = null,
  params = null,
  dynamicMessage = null,
  isToastMessageHide = false,
  cancelToken = '',
  onUploadProgress = () => {},
  withOrganizationId = true,
  withoutToken = false
}) => {
  const {
    method,
    isMultipart,
    url,
    showToast,
    module,
    ToastMessages,
    responseType,
    succesMsgHide,
    isShowAPIMessage = false
  } = endpoint
  let res = null

  const token = withoutToken ? null : window.localStorage.getItem(authConfig.storageTokenKeyName)

  try {
    let obj = {
      data: payloadData,
      method: method,
      headers: {
        'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json'
      },
      url: `${BASE_URLS.get(module)}${url}${id ? id : ''}${params ? convertObjToQueryString(params) : ''}`
    }

    if (method === 'GET' && payloadData && typeof payloadData === 'string') {
      obj.url += payloadData
    }
    if (method === 'POST') {
      if (!payloadData) payloadData = {}
    }
    if (token) obj.headers['Authorization'] = `Bearer ${token}`

    if (responseType) {
      obj.responseType = responseType
    }
    if (cancelToken) {
      obj.cancelToken = cancelToken
    }
    obj.onUploadProgress = onUploadProgress
    res = await axiosInstance(obj)
  } catch (err) {
    res = err.response
    try {
      showToast &&
        !isToastMessageHide &&
        Toast.error(
          isShowAPIMessage
            ? res?.data?.message ?? ''
            : getErrorToastMessage(ToastMessages, res?.data?.errorCode, toastErrorMessage.INTERNAL_SERVER_ERROR)
        )
      if (status === 401 || status === 403) {
        localStorage.removeItem(LOGGED_IN_USER_DATA)
        localStorage.removeItem(USER_ACCESS_TOKEN_KEY)
        let url = process.env.NEXT_PUBLIC_BASE_URL
        console.log(url, "url")
        url = `${url}/login`
        // window.location.replace(url)
      }
      return {
        data: {
          error: true,
          data: res?.data?.data,
          errorCode: res?.data?.errorCode,
          error: res?.data?.error,
          message: res.data.message ?? ''
        }
      }
    } catch (error) {
      return {
        data: {
          error: true,
          data: res?.data?.data,
          errorCode: res?.data.errorCode,
          error: res?.data?.error,
          message: res?.data?.message ?? ''
        }
      }
    }
  }

  if (res && res.data && !res.data.error && showToast && !isToastMessageHide && !succesMsgHide)
    Toast.success(
      isShowAPIMessage
        ? res?.data?.message ?? ''
        : getSuccessToastMessage(
            ToastMessages,
            res.data.errorCode,
            dynamicMessage,
            toastErrorMessage.INTERNAL_SERVER_ERROR
          )
    )
  return res
}

const getSuccessToastMessage = (ToastMessages, errorCode, dynamicMessage, toastErrorMessage_INTERNAL_SERVER_ERROR) => {
  if (ToastMessages && ToastMessages[`${errorCode}`]) {
    return dynamicMessage ? `${dynamicMessage}` : ToastMessages[`${errorCode}`]
  }

  if (dynamicMessage) {
    return dynamicMessage
  }

  return toastErrorMessage_INTERNAL_SERVER_ERROR
}

const getErrorToastMessage = (ToastMessages, errorCode, toastErrorMessage_INTERNAL_SERVER_ERROR) => {
  if (ToastMessages && ToastMessages[`${errorCode}`]) {
    return ToastMessages[`${errorCode}`]
  }
  return toastErrorMessage_INTERNAL_SERVER_ERROR
}
