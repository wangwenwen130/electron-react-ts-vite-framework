import axios, {
  type CreateAxiosDefaults,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios'

const createRequest = (config?: CreateAxiosDefaults) => {
  const instance = axios.create({
    timeout: 20000, // 20s
    baseURL: '', // 此配置在 vite.config.ts 中
    headers: {
      'Content-Type': 'application/json',
    },
    ...(config || {}),
  })

  async function request<T = unknown>(configParam: AxiosRequestConfig): Promise<Request.Response<T>> {
    return await instance
      .request<Request.Response<T>, AxiosResponse<Request.Response<T>>>(configParam)
      .then((res) => res.data)
  }

  instance.interceptors.response.use(
    (res) => {
      const response = res as AxiosResponse<Request.Response>
      if (response.status !== 200 || response.data.meta.code !== 200) {
        return Promise.reject(res)
      } else return response
    },
    (err) => {
      console.log('response error', err)
      return Promise.reject(err)
    },
  )

  return {
    instance,
    request,
    get: <T = unknown>(...args: Parameters<typeof instance.get>) =>
      instance.get<Request.Response<T>>(...args),
    post: <T = unknown>(...args: Parameters<typeof instance.post>) =>
      instance.post<Request.Response<T>>(...args),
  }
}

export default createRequest

