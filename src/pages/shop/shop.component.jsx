import React from 'react';
// import SHOP_DATA from './shop.data.js';
import './shop.styles.scss';
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

//Inside app.js, shoppage is nested in a route and hence route automatically passes "history", "match" and "location" props to this page.

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    
    state = {
        loading: true
    }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');


        //Making REST calls to cloud firestore

        // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-practice/databases/(default)/documents/collections')
        // .then(response => response.json())
        // .then(collections => console.log(collections))

        //Promise Pattern
        collectionRef.get().then(snapshot => {
            // console.log(snapshot);
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            // console.log(collectionsMap);
            updateCollections(collectionsMap);
            this.setState({loading: false})
        } )
        
        //Using Observable pattern
        // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
        //     console.log(snapshot);
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     // console.log(collectionsMap);
        //     updateCollections(collectionsMap);
        //     this.setState({loading: false})
        // } )

    }

    render() {
        const { loading } = this.state;
        const { match } = this.props;
        return (
            <div className='shop-page'>

                <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} /> } />
                <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} /> } />

                {/* <Route exact path={`${match.path}`} component={CollectionsOverview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} /> */}

            </div>
            
        );
    }       

};

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null,mapDispatchToProps)(ShopPage);



// console.log(match.params.collectionId);