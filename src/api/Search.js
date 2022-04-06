import request from '@/utils/request'

export const hotSearch = params => request({
    url:'/search/hot',
    params
})

export const searchReasultList = params => request({
    url:'/cloudsearch',
    params
})