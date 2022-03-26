import { Button } from '@material-ui/core'
import { Home } from '@material-ui/icons'
import React from 'react'
import PayWithPaypal from './Paypal'
import TipoHabitacion from '../TipoHabitacion/TipoHabitacion'


class pago extends React.Component {

    state = {
        total: 0.00,
        checkoutList:[],
        isCheckout: false,
        name: this.props.name
    }
    
    
    onAdd = (name, value) =>{
        console.log(name, value)
        this.setState({
            total: this.state.total + value,
            checkoutList: [...this.state.checkoutList, {name, value}]
        })
    }
    render () {
        const {total, checkoutList, isCheckout} = this.state
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
                        this.setState({ isCheckout:true })
                    }}
                }>
                    Checkout {`${checkoutList.length}`}
                </Button>

                    </div>
                </div>
                <Home
                onAdd={this.onAdd}/>
                
                
            </React.Fragment>
        )
    }
}
export default pago