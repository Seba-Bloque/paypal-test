import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import axios from 'axios'


export function Index() {

    const paypalCreateOrder = async () => {
        try {
            let response = await axios.post('/api/paypal/createorder', {
                user_id: '1',
                order_price: '100.00'
            })
            return response.data.data.order.order_id
        } catch (err) {
            // Your custom code to show an error like showing a toast:
            // toast.error('Some Error Occured')
            return null
        }
    }

    const paypalCaptureOrder = async (orderID: any) => {
        try {
            let response = await axios.post('/api/paypal/captureorder', { orderID });
            if (response.data.success) {
                // Order is successful
                // Your custom code

                // Like showing a success toast:
                // toast.success('Amount Added to Wallet')

                // And/Or Adding Balance to Redux Wallet
                // dispatch(setWalletBalance({ balance: response.data.data.wallet.balance }))
            }
        } catch (err) {
            // Order is not successful
            // Your custom code

            // Like showing an error toast
            // toast.error('Some Error Occured')
        }
    }
    return (
        <PayPalScriptProvider
            options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
                currency: 'USD',
                intent: 'capture'
            }}
        >
            <PayPalButtons
                style={{
                    color: 'gold',
                    shape: 'rect',
                    label: 'pay',
                    height: 50
                }}
                createOrder={async (data, actions) => {
                    let order_id = await paypalCreateOrder()
                    return order_id + ''
                }}
                onApprove={async (data, actions) => {
                    let response = await paypalCaptureOrder(data.orderID)
                    return response
                }}
            />
        </PayPalScriptProvider>
    )
}

export default Index