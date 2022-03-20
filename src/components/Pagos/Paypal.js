import React, {useState, useRef, useEffect} from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
//import ReactDOM from "react-dom"

//const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function PayWithPaypal(props) {
    const {items, total} = props;
    const [paidFor, setPaidFor] = useState(false)
    const [error, setError] = useState(null)
    const paypalRef = useRef()

    useEffect(() => {
        window.paypal
        .Buttons({
            createOrder:(data, actions)=>{
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [{
                        description: 'Reserve room checkout',
                        amount: {
                            currency_code: "USD",
                            value: 10.00
                        }
                    }]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                setPaidFor(true);
                console.log(order)
            },
            onError: err => {
                setError(err)
                console.error(err)
            }
        }).render(paypalRef.current)
    },[items])

    if (paidFor){
        return(
            <div>
                Thanks for making the purchase
            </div>
        )
    }

    if(error){
        return(
            <div>
                Error in procesing payment.Please try again
            </div>
        )
    }

    return(
        <div>
            <ListGroup>
                {items.map((item,index)=> 
                    <ListGroupItem key={index}>{item.name} - USD. {item.value}</ListGroupItem>
                )}
                <div>Total - USD. {total}</div>
                <div ref={paypalRef}/>
            </ListGroup>
        </div>
    )
}

export default PayWithPaypal


