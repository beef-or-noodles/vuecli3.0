/**
 * Created by HIAPAD on 2020/5/24.
 */
import request from '@/utils/request'
export const orderDetail = function(orderId) {
    return request({
        method: 'GET',
        url: `/api/order/agency-order/order-details?orderId=${orderId}`
    })
}
