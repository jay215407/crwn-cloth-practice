import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
// import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'; sive we moved related code to redux-saga.
import { signUpStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';

import './sign-up.styles.scss';

class SignUp extends React.Component {
    
    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { signUpStart } = this.props;
        const { displayName, email, password, confirmPassword } = this.state;
    
        if (password !== confirmPassword) {
          alert("passwords don't match");
          return;
        }
    
        signUpStart({ displayName, email, password });

        //Below tr-catch block moved to redux-saga withour this.setState
        // try {
            
        //     const { user } = await auth.createUserWithEmailAndPassword(email, password); // This returns an object.
            
        //     await createUserProfileDocument(user, {displayName});
            
            // this.setState({
            //     displayName: '',
            //     email: '',
            //     password: '',
            //     confirmPassword: ''
            // });

        // } catch(error) {
        //     console.log(error);
        // }
    };

    handleChange = event => {
        const { name, value } = event.target;
        
        this.setState({[name]: value});
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handleChange}
                        label='Display Name'
                        required
                    />

                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        label="Email"
                        required
                    />

                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        label="Password"
                        required
                    />

                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label="Confirm Password"
                        required
                    />
                    
                    <CustomButton type="submit">Sign Up</CustomButton>

                </form>
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(null,mapDispatchToProps)(SignUp);