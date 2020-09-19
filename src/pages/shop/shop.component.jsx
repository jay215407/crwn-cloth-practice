import React from 'react';
// import SHOP_DATA from './shop.data.js';
import './shop.styles.scss';
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';

//Inside app.js, shoppage is nested in a route and hence route automatically passes "history", "match" and "location" props to this page.

const ShopPage = ({ match }) => {
    // console.log(match.params.collectionId);
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionsOverview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
            </div>
            
        );

};

export default ShopPage;
