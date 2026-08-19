import Cookies from 'js-cookie'
import axios from 'axios'

const SESSION_TOKEN_KEY = 'woofmate_token'

export const getSessionToken = () => sessionStorage.getItem(SESSION_TOKEN_KEY)

export const setSessionToken = (token) => sessionStorage.setItem(SESSION_TOKEN_KEY, token)

export const clearSessionToken = () => sessionStorage.removeItem(SESSION_TOKEN_KEY)

axios.interceptors.request.use((config) => {
  const token = getSessionToken()
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const isLoggedIn=()=>{
  return !!getSessionToken() || !!Cookies.get('token')
}