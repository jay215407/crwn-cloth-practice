import React from 'react';
// import './homepage.styles.scss';
import Directory from '../../components/directory/directory.component';    
import { HomePageContainer } from './homepage.styles';


const HomePage = () => {
    return (
        <HomePageContainer>
            <Directory />
        </HomePageContainer>
    )
};

// const HomePage = () => {
//     return (
//         <div className='homepage'>
//             <Directory />
//         </div>
//     )
// };

export default HomePage;