import React from 'react';
import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item.component';
import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import CustomButton from '../custom-button/custom-button.component';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { toggleCartHidden } from '../../redux/cart/cart.actions';


const CartDropdown = ({ cartItems, history, dispatch }) => {
    
    return (
        <div className='cart-dropdown'>
            <div className='cart-items'>
            {
                cartItems.length ?
                cartItems.map(cartItem => (<CartItem key={cartItem.id} item={cartItem}/>))
                :
                <span className='empty-message'>Your Cart is Empty.</span>
            }    
            </div>
            <CustomButton onClick={() => {
                history.push('/checkout');
                dispatch(toggleCartHidden())
                }}>Go To Checkout</CustomButton>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

// const mapStateToProps = (state) => {
//     return {
//         cartItems: selectCartItems(state)
//     }
// }

export default withRouter(connect(mapStateToProps)(CartDropdown));

//When mapDispatch to props is not sent as second parameter to connect function, connect automatically passes that into props as "dispatch" parameter.