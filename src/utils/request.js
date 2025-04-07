import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

//创建axios实例对象
const request = axios.create({
  baseURL: '/api',
  timeout: 600000
})

//axios的请求 request 拦截器--发送请求前获取localStorage中的token 并添加到请求头中
request.interceptors.request.use(
  (config) => { //成功回调
    const LoginUser = JSON.parse(localStorage.getItem('LoginUser'))
    if(LoginUser&&LoginUser.token) { //判断是否存在token
      config.headers.token = LoginUser.token //添加token到请求头中
    }
    return config
  }, 
)
//axios的响应 response 拦截器 -- 如果返回的状态码为401，则跳转到登录页
request.interceptors.response.use(
  (response) => { //成功回调
    return response.data
  },
  (error) => { //失败回调
    if(error.response.status === 401) { //如果返回的状态码为401，则跳转到登录页
      //提示用户未登录
      ElMessage({
        message: '未登录或登录已过期，请重新登录',
        type: 'error' 
      })  
      router.push('/login') //跳转到登录页
    }else {
      //提示错误信息
      ElMessage({
        message: '请求失败，请稍后再试',
        type: 'error'
      })
    }
    return Promise.reject(error)
  }
)

export default request