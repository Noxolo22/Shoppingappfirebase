import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import CheckoutItem from '../../ui/checkout-Item/CheckoutItem'
import StripeCheckoutButton from '../../ui/stripe-button/StripeCheckoutButton'

import {
  selectCartItems,
  selectCartTotal
} from '../../redux/cart/cartSelectors'

import './Checkout.scss'

const Checkout = ({ cartItems, cartTotal }) => {
  return (
    <div className='checkout-page'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map(cartItem => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className='total'>
        <span>Total: R{cartTotal}</span>
      </div>
      <div className='test-card-warning'>
        <span>
          *Please use the following test credit card data for test payments
        </span>
        <span className='test-card-number'>
          4342 2586 5822 5586 - Exp 02/22 - CW: 125
        </span>
      </div>
      <StripeCheckoutButton price={cartTotal} />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartTotal: selectCartTotal
})

export default connect(mapStateToProps)(Checkout)
