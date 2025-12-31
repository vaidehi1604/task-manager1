/****
 * You can put any key constant here which you want to use many times or one time
 */
export const USER_ACCESS_TOKEN_KEY = 'accessToken'
export const USER_REFRESH_TOKEN_KEY = 'refreshToken'
export const LOGGED_IN_USER_DATA = 'userData'
export const USER_ROLE_KEY = 'role'
export const USER_ORGANIZATION_ROLE_KEY = 'userOrganizationRole'
export const ORGANIZATION_ID = 'organizationId'

export const ROLE_ADMIN = 'ADMIN'
export const ROUTE_ADMIN = '/'

export const ADMIN_SERVICE_KEY = 'ADMIN'
export const DEFAULT_SERVICE_KEY = 'DEFAULT'
export const PAGE_SERVICE_KEY = 'PAGES'

export const API_METHOD_GET = 'GET'
export const API_METHOD_POST = 'POST'
export const API_METHOD_DELETE = 'DELETE'
export const API_METHOD_PUT = 'PUT'

export const ROLE_OWNER = 'owner'
export const ROLE_COMPANY = 'record company'

export const RESPONSE_OK = 200
export const RESPONSE_CREATED = 201

export const ERROR_CODE_EXPIRED_TOKEN = 'AUTH004'

// this MAP for make diffrent service separated url
export const BASE_URLS = new Map()
// BASE_URLS.set(ADMIN_SERVICE_KEY, `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin`)
// BASE_URLS.set(DEFAULT_SERVICE_KEY, `${process.env.NEXT_PUBLIC_API_BASE_URL}`)

export const LANGUAGE_EN = 'en'
export const MAX_PHONE_NUMBER = 10
export const MIN_VALUE_TEXT = 3
export const MIN_VALUE_SEARCH = 1
export const MAX_VALUE_TEXT = 64
export const CHARACTER_LIMIT = 128
export const IMAGE_SIZE_5_MB = 5242880
export const FILE_SIZE_10_MB = 10000000
export const MAX_50 = 50
export const MAX_20 = 20
export const MAX_500 = 500
export const MAX_100 = 100
export const MAX_150 = 150
export const MIN_1 = 1
export const ZIP_CODE_MAX = 6
export const MAX_VALUE_TEXT_128 = 128

export const TOAST_TIME = {
  duration: 3000
}

export const darkBlackColor = '#1E1E21'
export const darkBlackColor1 = '#101013'
export const primaryBlackColor = '#181414'
export const lightWhiteColor = '#FFFFFF'
export const errorColor = '#D70E20'

export const ACCEPTED_FILE_FORMAT = {
  AI_MODEL: {
    'text/docx': ['.docx'],
    'text/pdf': ['.pdf']
  }
}

export const countries = [
  { name: 'USA', code: 'US' },
  { name: 'England', code: 'GB' },
  { name: 'China', code: 'CN' },
  { name: 'Switzerland', code: 'CH' },
  { name: 'France', code: 'FR' },
  { name: 'Belgium', code: 'BE' },
  { name: 'Germany', code: 'DE' },
  { name: 'Monaco', code: 'MC' },
  { name: 'San Marino', code: 'SM' },
  { name: 'Vatican City State', code: 'VA' },
  { name: 'Finland', code: 'FI' },
  { name: 'Estonia', code: 'EE' },
  { name: 'Latvia', code: 'LV' },
  { name: 'Romania', code: 'RO' },
  { name: 'Croatia', code: 'HR' },
  { name: 'Slovenia', code: 'SI' },
  { name: 'Serbia', code: 'RS' },
  { name: 'Austria', code: 'AT' },
  { name: 'Scotland', code: 'GB-SCT' }, // Scotland is part of the UK
  { name: 'Italy', code: 'IT' },
  { name: 'Israel', code: 'IL' },
  { name: 'Canada', code: 'CA' },
  { name: 'South Korea', code: 'KR' },
  { name: 'Brazil', code: 'BR' },
  { name: 'Mexico', code: 'MX' },
  { name: 'Colombia', code: 'CO' },
  { name: 'Argentina', code: 'AR' },
  { name: 'Peru', code: 'PE' },
  { name: 'Nigeria', code: 'NG' },
  { name: 'Kenya', code: 'KE' },
  { name: 'South Africa', code: 'ZA' },
  { name: 'Russia', code: 'RU' },
  { name: 'Azerbaijan', code: 'AZ' },
  { name: 'Kazakhstan', code: 'KZ' },
  { name: 'Norway', code: 'NO' },
  { name: 'Sweden', code: 'SE' },
  { name: 'Ireland', code: 'IE' },
  { name: 'Iceland', code: 'IS' },
  { name: 'Greece', code: 'GR' },
  { name: 'Luxembourg', code: 'LU' },
  { name: 'Netherlands', code: 'NL' },
  { name: 'Albania', code: 'AL' },
  { name: 'Turkey', code: 'TR' },
  { name: 'Saudi Arabia', code: 'SA' },
  { name: 'United Arab Emirates', code: 'AE' },
  { name: 'India', code: 'IN' }
]

export const statusColors = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// public URLs
// export const PUBLIC_BASE_FRONTEND_URL = process.env.NEXT_PUBLIC_BASE_URL
// export const S3_BUCKET_URL = process.env.NEXT_PUBLIC_AI_MODEL_S3_IMAGES_URL
