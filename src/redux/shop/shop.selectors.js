import { createSelector } from 'reselect';

//Below map is required when we have shop data in form of array of objects. 

// const COLLECTION_ID_MAP = {
//     hats: 1,
//     sneakers: 2,
//     jackets: 3,
//     womens: 4,
//     mens: 5
// };

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key]),
)


export const selectCollection = collectionUrlParam => createSelector(
    [selectCollections],
    collections => collections[collectionUrlParam]
)

//Below selector is used when shop data in form of array of objects. 

// export const selectCollection = collectionUrlParam => createSelector(
//     [selectCollections],
//     collections => collections.find(collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam])
// )