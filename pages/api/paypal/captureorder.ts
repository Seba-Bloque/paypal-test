import client from '../../../src/utils/paypal/index'
import paypal from '@paypal/checkout-server-sdk'

export default async function Handler(req: any, res: any) {

    if (req.method != "POST")
        return res.status(404).json({ success: false, message: "Not Found" })

    if (!req.body.orderID)
        return res.status(400).json({ success: false, message: "Please Provide Order ID" })

    //Capture order to complete payment
    const { orderID } = req.body
    const PaypalClient = client()
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({
        payment_source: {
            token: {
                id: 'A21AAJMuYwWnAniScyec8Y8cwP4Xr_Gwl03Ecbv79UV7CpL5et_JfJnB7TfhLmszdyF3avafxtKAUE0HmKkpjMIysT4vY3-5g',
                type: 'BILLING_AGREEMENT',
            },
        },
    });

    const response = await PaypalClient.execute(request)
    if (!response) {
        return res.status(500).json({ success: false, message: "Some Error Occured at backend" })
    }

    res.status(200).json({ success: true, data: { response } })
}