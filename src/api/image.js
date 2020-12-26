import request from '@/utils/request'
/**
 * 获取素材列表
 */
export const getImages = params => {
  return request({
    // baseURL: 'http://ttapi.research.itcast.cn/',
    baseURL: 'http://api-toutiao-web.itheima.net/',
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}
