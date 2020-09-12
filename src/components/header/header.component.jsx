import React from 'react';
import './header.styles.scss';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

const Header = ({ currentUser, hidden }) => {
    return (
        <div className='header'>
            <Link className='logo-container' to="/">
                <Logo className='logo'/>
            </Link>

            <div className='options'>
                <Link className='option' to='/shop'>
                    SHOP
                </Link>
                <Link className='option' to='/shop'>
                    Contact
                </Link>
                {
                    currentUser ?
                    <div className='option' onClick={() =>auth.signOut()} >SIGN OUT</div>
                    :
                    <Link className='option' to='/signin'>SIGN IN</Link>
                }

                <CartIcon />
            </div>
            {
                hidden ? null : <CartDropdown />
            }
            
        </div>
    )
};


const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

// const mapStateToProps = (state) => {
//     return {
//         currentUser: selectCurrentUser(state),
//         hidden: selectCartHidden(state)
//     }
// };

// const mapStateToProps = ({ user: {currentUser}, cart: {hidden} }) => {
//     return {
//         currentUser,
//         hidden
//     }
// };

// Above is advance syntax for below code.
// const mapStateToProps = state => {
//     return {
//         currentUser: state.user.currentUser
//     }
// };

export default connect(mapStateToProps)(Header);