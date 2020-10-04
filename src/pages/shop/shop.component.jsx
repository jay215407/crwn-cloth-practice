import React from 'react';
// import SHOP_DATA from './shop.data.js';
import './shop.styles.scss';
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import { connect } from 'react-redux';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

//Inside app.js, shoppage is nested in a route and hence route automatically passes "history", "match" and "location" props to this page.

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

    componentDidMount() {

        const { fetchCollectionsStart } = this.props;

        fetchCollectionsStart();
    }

    render() {
        
        const { match, isCollectionFetching, isCollectionsLoaded } = this.props;
        // console.log(isCollectionsLoaded);
        return (
            <div className='shop-page'>

                <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} /> } />
                <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} /> } />

                {/* <Route exact path={`${match.path}`} component={CollectionsOverview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} /> */}

            </div>
            
        );
    }       

};

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionsLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(mapStateToProps,mapDispatchToProps)(ShopPage);



// console.log(match.params.collectionId);



    // All this code is used before using redux-thunk
    // state = {
    //     loading: true
    // }

    // unsubscribeFromSnapshot = null;

    // componentDidMount() {
    //     const { updateCollections } = this.props;
    //     const collectionRef = firestore.collection('collections');


    //     //Making REST calls to cloud firestore

    //     // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-practice/databases/(default)/documents/collections')
    //     // .then(response => response.json())
    //     // .then(collections => console.log(collections))

    //     //Promise Pattern
    //     collectionRef.get().then(snapshot => {
    //         // console.log(snapshot);
    //         const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //         // console.log(collectionsMap);
    //         updateCollections(collectionsMap);
    //         this.setState({loading: false})
    //     } );
        
    //     //Using Observable pattern
    //     // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
    //     //     console.log(snapshot);
    //     //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //     //     // console.log(collectionsMap);
    //     //     updateCollections(collectionsMap);
    //     //     this.setState({loading: false})
    //     // } )

    // }