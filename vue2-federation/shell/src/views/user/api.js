//*** this my xxx comments */
import request from '@/utils/request'
import { httpRequest, rawRequest as raw} from '@/utils/http-request'

export function getUserInfo(xxx) {
    return request({
        url: '/user/info',
        method: 'get'
    })
}

export function shouldBeShaked() {
    return request({
        url: 'admin/tree/shake',
        method: 'get'
    })
}

export const getDataWithHttp = (data) => {
    return httpRequest({
        url: 'admin/http/v2',
        data
    })
}

function getRawData() {
    return raw({
        url: 'admin/raw/v2',
        data
    })
}

export { getRawData }