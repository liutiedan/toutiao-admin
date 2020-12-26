/**
 * 文章相关请求模块
 */
import request from '@/utils/request'

/**
 * 获取文章列表
 */
export const getArticles = params => {
  return request({
    baseURL: 'https://www.fastmock.site/mock/bcb5b058dee33083744167c746058e8f/toutiao',
    method: 'GET',
    url: './articles',
    // Body 参数使用 data 设置
    // Query 参数使用 params 设置
    // Headers 参数使用 headers 设置
    // params
    data: params
  })
}

export const getArticleChannels = () => {
  return request({
    baseURL: 'http://ttapi.research.itcast.cn/',
    method: 'GET',
    url: '/app/v1_0/channels'
    // Body 参数使用 data 设置
    // Query 参数使用 params 设置
    // Headers 参数使用 headers 设置
  })
}

// export const getTest = () => {
//   return request({
//     baseURL: 'http://api-toutiao-web.itheima.net/',
//     method: 'GET',
//     url: '/mp/v1_0/articles'
//   })
// }

/**
 * 新建文章
 */
export const addArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/articles',
    params: {
      draft // 是否存为草稿（true 为草稿）
    },
    data
  })
}

/**
 * 获取指定文章
 */
export const getArticle = articleId => {
  return request({
    baseURL: 'https://www.fastmock.site/mock/bcb5b058dee33083744167c746058e8f/toutiao',
    method: 'GET',
    url: './articles'
  })
}

/**
 * 编辑文章
 */
export const updateArticle = (articleId, data, draft = false) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      draft // 是否存为草稿（true 为草稿）
    },
    data
  })
}

export const getTest = () => {
  return request({
    baseURL: 'http://api-toutiao-web.itheima.net/',
    method: 'GET',
    url: '/app/v1_0/articles'
  })
}
