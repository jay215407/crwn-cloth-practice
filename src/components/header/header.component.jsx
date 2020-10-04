import React from 'react';
// import './header.styles.scss';
// import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';
import { signOutStart } from '../../redux/user/user.actions';

const Header = ({ currentUser, hidden , signOutStart }) => {
    return (
        <HeaderContainer>
            <LogoContainer to="/">
                <Logo className='logo'/>
            </LogoContainer>

            <OptionsContainer>
                <OptionLink to='/shop'>
                    SHOP
                </OptionLink>
                <OptionLink to='/shop'>
                    Contact
                </OptionLink>
                {
                    currentUser ?
                    <OptionLink as='div' onClick={signOutStart} >SIGN OUT</OptionLink>
                    //<OptionLink as='div' onClick={() =>auth.signOut()} >SIGN OUT</OptionLink> before moving sign out to redux-saga.
                    :
                    <OptionLink to='/signin'>SIGN IN</OptionLink>
                }

                <CartIcon />
            </OptionsContainer>
            {
                hidden ? null : <CartDropdown />
            }
            
        </HeaderContainer>
    )
};


const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps,mapDispatchToProps)(Header);

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




//Old file before converting in styled components

// const Header = ({ currentUser, hidden }) => {
//     return (
//         <div className='header'>
//             <Link className='logo-container' to="/">
//                 <Logo className='logo'/>
//             </Link>

//             <div className='options'>
//                 <Link className='option' to='/shop'>
//                     SHOP
//                 </Link>
//                 <Link className='option' to='/shop'>
//                     Contact
//                 </Link>
//                 {
//                     currentUser ?
//                     <div className='option' onClick={() =>auth.signOut()} >SIGN OUT</div>
//                     :
//                     <Link className='option' to='/signin'>SIGN IN</Link>
//                 }

//                 <CartIcon />
//             </div>
//             {
//                 hidden ? null : <CartDropdown />
//             }
            
//         </div>
//     )
// };