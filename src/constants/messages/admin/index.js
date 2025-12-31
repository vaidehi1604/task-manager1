import i18n from 'i18next'

export const toastErrorMessage = {
  INTERNAL_SERVER_ERROR: 'Something went wrong.'
}

export const toastSuccessMessage = {
  LOGIN_SUCCESS: 'loginSuccess'
}

export const validationMessages = {
  email: 'emailRequired'
}

export const errorCodeMessages = {
  AUTH001: i18n.t('login.AUTH001'),
  ERR404: i18n.t('login.ERR404')
}

export const adminAPIBasedMessagesCodes = {
  LOGIN_ADMIN_API: {
    AUTH001: 'Incorrect email or password',
    AUTH002: 'Password format is invalid',
    SUC000: 'Logged in Successfully',
    ERR404: 'Incorrect email or password',
    AUTH009: 'Incorrect Password',
    AUTH114: 'your account is deactivated so You cannot log in',
    ERR500: 'Internal Server Error'
  },

  LOGOUT_ADMIN_API: { SUC000: 'Logged out Successfully', ERR500: 'Internal Server Error' },

  FORGOT_PASS_ADMIN_API: {
    SUC000: 'Please check your email for password reset link',
    ERR404: 'Admin not found',
    AUTH001: 'Invalid Email Address',
    ERR500: 'Admin Not Exist'
  },

  RESET_PASS_ADMIN_API: {
    SUC000: 'Password Reset Successfully',
    AUTH003: 'Invalid token',
    AUTH002: 'Invalid new password',
    AUTH005: 'New password cannot be same as current password',
    AUTH004: 'OTP is Expired',
    ERR500: 'Internal Server Error'
  },

  CHANGE_PASS_ADMIN_API: {
    SUC000: 'password changed successfully',
    AUTH001: 'Incorrect Current password',
    AUTH005: 'New password cannot be same as current password',
    EMG001: 'Invalid password',
    ERR500: 'Internal Server Error'
  },

  VERIFY_OTP_ADMIN_API: {
    SUC000: 'Verify OTP Successfully',
    AUTH004: 'Invalid OTP',
    AUTH003: 'Invalid token',
    AUTH002: 'Invalid email or otp',
    AUTH005: 'OTP is Expired',
    ERR404: 'Admin not found',
    ERR500: 'Internal Server Error'
  },

  NEW_USER_REQUEST_ACCEPT_API: {
    AUTH002: 'User not found'
  },
  DELETE_USER_API: {
    AUTH002: 'User not found',
    SUC000: 'User deleted successfully'
  },

  DELETE_ALBUM_API: {
    SUC000: 'Album deleted successfully',
    ERR404: 'Album not found',
    ERR500: 'Internal Server Error'
  },

  CREATE_DEVICE_API: {
    SUC000: 'Device created successfully',
    ERR500: 'Internal Server Error'
  },

  DELETE_MUSIC_API: {
    SUC000: 'Music deleted successfully',
    ERR404: 'Music not found',
    ERR500: 'Internal Server Error'
  }
}
