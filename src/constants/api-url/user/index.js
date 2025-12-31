/* *|MARKER_CURSOR|* */
import { userApiEndpoints } from "../../api-endpoints/user/user";
import {
  API_METHOD_GET,
  API_METHOD_POST,
  ADMIN_SERVICE_KEY,
} from "../../appConstants";
import { APIcodeBasedToastMessages } from "../../messages";

/****
 * @url - you need to pass endpoints of api which is comes from apiEndpoints object
 * @method - you need to pass method type of api which key comes from appConstants file
 * @withToken - true,false - if api required token or not
 * @module - if there is multiple service in backend
     so you need to key constant of that service key which comes from appConstants file
 * @isMultipart - you need to make true when api is for file upload otherwise false
 * @showToast - for success or error if you want show toast message then make it true otherwise false
 * @ToastMessages - it is a function with argument of variable name itself , it's used to show a custom toast message based on codes
 * @succesMsgHide - it is a variable name itself , it's used to Hide a succes toast message based on codes #SUC000
     */

// new user request listing
export const USER_REGISTRATION = {
  url: userApiEndpoints.ENDPOINTS_USER_REGISTRATION,
  method: API_METHOD_POST,
  withToken: false,
  module: USER_SERVICE_KEY,
  isMultipart: false,
  showToast: false,
  ToastMessages: APIcodeBasedToastMessages('USER_REGISTRATION')
};

export const CREATE_TASK = {
  url: userApiEndpoints.ENDPOINTS_CREATE_TASK,
  method: API_METHOD_POST,
  withToken: true,
  module: USER_SERVICE_KEY,
  isMultipart: false,
  showToast: false,
  // ToastMessages: APIcodeBasedToastMessages('USER_REGISTRATION')
};

export const TASK_LIST = {
  url: userApiEndpoints.ENDPOINTS_TASK_LIST,
  method: API_METHOD_GET,
  withToken: true,
  module: USER_SERVICE_KEY,
  isMultipart: false,
  showToast: false,
  // ToastMessages: APIcodeBasedToastMessages('USER_REGISTRATION')
};

