import React from 'react';
import { SpinnerOverlay, SpinnerContainer } from './with-spinner.styles';


const WithSpinner = WrappedComponent => {
    const Spinner = ( { isLoading, ...otherProps }) => {
        return isLoading ? (
            <SpinnerOverlay>
            <SpinnerContainer />
            </SpinnerOverlay>
        ) :
       
        (<WrappedComponent {...otherProps} />);
    };

    return Spinner;
};


// const WithSpinner = WrappedComponent => ( { isLoading, ...otherProps }) => {
//     return isLoading ? (
//         <SpinnerOverlay>
//             <SpinnerContainer />
//         </SpinnerOverlay>
//     ) :
//     <WrappedComponent {...otherProps} />
// };

export default WithSpinner;