import { Button } from '@material-ui/core'
import { Home } from '@material-ui/icons'
import React from 'react'
import PayWithPaypal from './Paypal'
import TipoHabitacion from '../TipoHabitacion/TipoHabitacion'


function pago (props) {
    
    props = {
        total: 0.00,
        checkoutList:[],
        isCheckout: false,
    }
    
    
    function onAdd(name, value){
        console.log(name, value)
        this.setState({
            total: props.total + value,
            checkoutList: [...props.checkoutList, {name, value}]
        })
    }

        const {total, checkoutList, isCheckout} = props
        console.log(total)
        console.log(this.state.name);
        if (isCheckout){
            return(
                <PayWithPaypal
                total = {total}
                items = {checkoutList}
                />
            )
        }

        return (
            <React.Fragment>
                <div className='home-container'>
                    <div className='brand'>Parchita</div>
                    <div className='checkout'>
                        <div className='checkout-total'>Total: USD {total}/-</div>
                        <Button className='checkout-button' onClick={() => {
                    if (checkoutList.length){
                        props.setState({ isCheckout:true })
                    }}
                }>
                    Checkout {`${checkoutList.length}`}
                </Button>

                    </div>
                </div>
                <Home
                onAdd={props.onAdd}/>
                
                
            </React.Fragment>
        )
    }

export default pago