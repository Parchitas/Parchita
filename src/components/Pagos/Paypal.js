import React, { useState, useRef, useEffect } from "react";

function PayWithPaypal(props) {
    const { items, total } = props;
    const [paidFor, setPaidFor] = useState(false)
    const [error, setError] = useState(null)
    const paypalRef = useRef()

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [{
                            description: items[0],
                            amount: {
                                currency_code: "USD",
                                value: total
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
    }, [items])

    if (paidFor) {
        return (
            <div>
                Gracias por la compra.
            </div>
        )
    }

    if (error) {
        return (
            <div>
                Error en el proceso de compra. Por favor, intente de nuevo.
            </div>
        )
    }

    return (
        <div>
            {/* {items.map((item,index)=> 
                    <ListGroupItem key={index}>{item.name} - USD. {item.value}</ListGroupItem>
                )}
                <div>Total - USD. {total}</div> */}
            <div ref={paypalRef} />
        </div>
    )
}

export default PayWithPaypal


