import React from 'react';
import './collection.styles.scss';
import CollectionItem from '../../components/collection-item/collection-item.component';
import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selectors';
//Inside shop page, category is nested in a route and hence route automatically passes "history", "match" and "location" props to this page.

const CollectionPage = ({ collection }) => {
    // console.log(match.params.collectionId);
    console.log(collection);
    const { title, items } = collection;
    return (
        <div className='collection-page'>
            <h2 className='title'>{title}</h2>
            <div className='items'>
                {
                    items.map(item => (<CollectionItem key={item.id} item={item} />))
                }
            </div>
        </div>
    )
};

//ownProps ==> props of component that we are wrapping into connect

const mapStateToProps = (state, ownProps) => {
    return {
        collection: selectCollection(ownProps.match.params.collectionId)(state) // This is necessary bcoz unlike other selectors this selector needs part of a state depending on the url parameter.
    }
}

export default connect(mapStateToProps)(CollectionPage);