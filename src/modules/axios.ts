import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { LocalStorage, Notify } from 'quasar'
const router = useRouter()

export interface HttpResponse<T = unknown> {
  data: T
  code: number
  status: number
  message?: string
}

// replace this with i18n
const lang: string[] = []
const parseError = (result: any) => {
  if (result.status === 401) {
    LocalStorage.set('lastUrl', router.currentRoute.value.fullPath)
    setTimeout(() => {
      router.push({
        name: 'login',
        params: { redirect: router.currentRoute.value.fullPath },
      })
    }, 350)
  }
  else {
    Notify.create({
      type: 'warning',
      position: 'top',
      message: lang[result.data] || lang[result.code] || result.message,
    })
  }
}

const api: AxiosInstance = axios.create({})

api.interceptors.request.use((req: AxiosRequestConfig) => {
  const token = window.localStorage.getItem('TOKEN_KEY')
  if (token) {
    // 配置请求头
    req.headers = {
      // 'Content-Type':'application/x-www-form-urlencoded',   // 传参方式表单
      'Content-Type': 'application/json;charset=UTF-8', // 传参方式json
      'Authorization': token, // 这里自定义配置，这里传的是token
    }
  }
  else {
    location.href = 'https://api.inyaw.com/inyaa-admin/toLogin'
  }
  return req
})

api.interceptors.response.use((res: AxiosResponse<HttpResponse>) => {
  if (res.data?.code === 1001)
    location.href = 'https://api.inyaw.com/inyaa-admin/toLogin'

  if (res.data?.code === 200)
    return res.data

  // business login error can be processed here
  parseError(res)
  return Promise.reject(res)
},

async (err) => {
  const response = err.response
  parseError(response.data)
  return Promise.reject(response)
},
)

export { api, axios }
