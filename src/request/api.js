import https from "./https"
//携带有请求参数的
export const xxx = (params) => https.get("xxx", { params })
export const xxxx = (data) => https.post("xxx", data)
//没有携带有请求参数的
export const xxxn = () => https.get("xxx")
export const xxxxn = () => https.post("xxx")

// 封装获取频道下的文章列表函数
export const articleList = function(id, timestamp) {
    return https.get('/restful1', {
        params: {
        }
    })
}
