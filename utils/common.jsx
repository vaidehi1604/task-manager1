import moment from 'moment'
const { getCountryCallingCode } = require('libphonenumber-js')

import { deleteCookie, getCookie as getCookieData, setCookie } from 'cookies-next'
import {
  LOGGED_IN_USER_DATA,
  ORGANIZATION_ID,
  RESPONSE_CREATED,
  RESPONSE_OK,
  USER_ACCESS_TOKEN_KEY,
  USER_ROLE_KEY
} from '../constants/appConstants'
import authConfig from 'src/configs/auth'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { useEffect, useState } from 'react'

export const isUserLoggedInWithToken = () => (isClientSide() ? localStorage.getItem(USER_ACCESS_TOKEN_KEY) : '')

/**
 * It clears the cookie with the key passed in as an argument
 * @param key - The name of the cookie.
 */
export const clearTokenCookie = (key, options = {}) => {
  const defaultOptions = {
    path: '/' // Specify a common path for all cookies
  }
  deleteCookie(key, { ...defaultOptions, ...options })
}

/**
 * It creates a cookie
 * @param key - The name of the cookie
 * @param value - The value of the cookie.
 *  @param options - Additional options for the cookie (e.g., path)
 */

export const createCookie = (key, value, options = {}) => {
  const defaultOptions = {
    path: '/' // Specify a common path for all cookies
  }
  setCookie(key, value, { ...defaultOptions, ...options })
}

/**
 * It takes a key as an argument, parses the cookies, and returns the value of the cookie with the key
 * that was passed in
 * @param key - The name of the cookie you want to get.
 * @returns The value of the cookie with the key that is passed in.
 */
export const getCookie = key => {
  const cookies = getCookieData(key)
  return cookies
}

/**
 * It takes an object and returns a query string
 * @param obj - The object you want to convert to a query string.
 * @returns A query string.
 */
export const convertObjToQueryString = obj => {
  return '?' + new URLSearchParams(obj).toString()
}

/**
 * If the object has no keys, then it's empty.
 * @param obj - The object to check if it's empty.
 */
export const isObjEmpty = obj => Object.keys(obj).length === 0

/**
 * The function `getDecodeAccessTokenData` decodes and returns the data from the second part of an
 * access token.
 * @param authToken - The `authToken` parameter is a string that represents an encoded access token.
 * @returns the decoded data from the access token.
 */
export const getDecodeAccessTokenData = authToken => {
  return JSON.parse(atob(authToken.split('.')[1]))
}

/**
 * The `truncateTextWithDot` function takes in a `text` string and a `limit` number, and returns a
 * truncated version of the text with a dot at the end if the text exceeds the limit.
 * @param text - The `text` parameter is the string that you want to truncate.
 * @param limit - The `limit` parameter specifies the maximum number of characters that the `text`
 * should be truncated to.
 * @returns the truncated text with a dot at the end if the length of the text is greater than the
 * specified limit.
 */
export const truncateTextWithDot = (text, limit) => {
  if (text.length <= limit) {
    return text
  }
  return `${text.slice(0, limit)}...`
}

export const checkSuccessResponse = res => {
  return res?.status === RESPONSE_OK || res?.status === RESPONSE_CREATED
}

/**
 * The function `formatDateFromTimestamp` takes a timestamp and returns a formatted date in the format
 * 'DD/MM/YYYY'.
 * @param timestamp - The `timestamp` parameter is a Unix timestamp, which represents the number of
 * seconds that have elapsed since January 1, 1970, 00:00:00 UTC.
 * @returns a formatted date string in the format 'DD/MM/YYYY'.
 */
export const formatDateFromTimestamp = timestamp => {
  const date = moment.unix(timestamp)
  const formattedDate = date.format('DD/MM/YYYY')
  return formattedDate
}

/**
 * The function checks if a value matches multiple validation patterns and returns an error message if
 * it doesn't.
 * @returns either the validation message if the value does not pass the validation rule, or true if
 * the value passes all the validation rules.
 */
export const checkMultiplePetternValidationRegx = ({ value, validations }) => {
  for (const validation of validations) {
    if (!validation.rule.test(value)) {
      return validation.message
    }
  }
  return true
}

export const countSkipValue = (page, pageSize) => (page - 1) * pageSize

export const getTopThreeLikeIcons = post => {
  const { likeCount, favoriteLikeCount, celebrateLikeCount, supportLikeCount, FunnyLikeCount, intelligentLikeCount } =
    post

  const likeCounts = [
    { count: parseInt(likeCount), icon: 'ThubmIconFill' },
    { count: parseInt(favoriteLikeCount), icon: 'LikeIcon' },
    { count: parseInt(celebrateLikeCount), icon: 'CelebrateIcon' },
    { count: parseInt(supportLikeCount), icon: 'SupportIcon' },
    { count: parseInt(FunnyLikeCount), icon: 'HappyEmojiIcon' },
    { count: parseInt(intelligentLikeCount), icon: 'IdeaIcon' }
  ]

  const uniqueLikes = likeCounts.filter(like => like.count > 0)
  uniqueLikes.sort((a, b) => b.count - a.count)
  const topThreeLikeCounts = uniqueLikes.slice(0, 3)
  const topThreeLikeIcons = topThreeLikeCounts.map(like => like.icon)

  return topThreeLikeIcons
}

export const isClientSide = () => {
  return typeof window !== 'undefined'
}

export const getOrganizationIdFromSessionStorage = () => {
  if (isClientSide()) return window?.sessionStorage?.getItem(ORGANIZATION_ID) || null // or handle the absence of window object in another way
}

export const setOrganizationIdInToSessionStorage = organizationId => {
  if (organizationId && isClientSide()) return window.sessionStorage.setItem(ORGANIZATION_ID, organizationId)
}

export const removeOrganizationIdFromSessionStorage = () => {
  if (isClientSide()) return window.sessionStorage.removeItem(ORGANIZATION_ID)
}

export const setLoginUserToLocalStorage = data => {
  const userData = {
    id: data.id,
    email: data.email,
    name: data.firstName
  }
  window.localStorage.setItem(authConfig.storageTokenKeyName, data.accessToken)
  window.localStorage.setItem(LOGGED_IN_USER_DATA, JSON.stringify(userData))
  window.localStorage.setItem(USER_ROLE_KEY, userData?.role)
}

export function isValidJSON(text) {
  try {
    JSON.parse(text)
    return true
  } catch (error) {
    return false
  }
}

export function getFileSizeInMB(file) {
  if (!file && !file?.size) {
    return false
  } else {
    return (Math.round(file?.size / 100) / 10000).toFixed(1)
  }
}

export const capitalizeWord = s => {
  return s.toLowerCase().replace(/\b./g, function (a) {
    return a.toUpperCase()
  })
}

export const getCountryCode = country => {
  try {
    const countryCode = getCountryCallingCode(country.toUpperCase())
    return countryCode
  } catch (error) {
    console.error('Invalid country abbreviation:', error.message)
    return null
  }
}

export const chartOptions = (totalCount, theme, title) => {
  return {
    colors: [
      hexToRGBA(theme.palette.success.main, 0.75),
      hexToRGBA(theme.palette.success.main, 0.5),
      hexToRGBA(theme.palette.success.main, 0.25),
      theme.palette.success.main
    ],
    stroke: { width: 0 },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    labels: ['1st Week'],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    grid: {
      padding: { top: 10 }
    },
    plotOptions: {
      pie: {
        customScale: 1,
        expandOnClick: false,
        donut: {
          size: '80%',
          labels: {
            show: true,
            name: {
              offsetY: 22,
              color: theme.palette.text.secondary,
              fontFamily: theme.typography.fontFamily
            },
            value: {
              offsetY: -17,
              fontWeight: 500,
              fontSize: '22px',
              formatter: val => `${val}%`,
              color: theme.palette.text.primary,
              fontFamily: theme.typography.fontFamily
            },
            total: {
              show: true,
              label: title || 'Total',
              fontSize: '14px',
              color: theme.palette.text.secondary,
              fontFamily: theme.typography.fontFamily,

              formatter: () => {
                return totalCount !== null ? `${totalCount}` : 'N/A'
              }
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          chart: { height: 155 }
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          chart: { height: 171 }
        }
      }
    ]
  }
}

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export const getQueryFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const skip = parseInt(urlParams.get('skip')) || 1
  const page = parseInt(urlParams.get('page')) || 1
  const limit = parseInt(urlParams.get('limit')) || 10
  const q = urlParams.get('q') || ''
  const sortBy = urlParams.get('sortBy') || 'All'
  return { page, skip, limit, q, sortBy }
}
