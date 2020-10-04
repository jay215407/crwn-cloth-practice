import { takeLatest, call, put, all } from 'redux-saga/effects'; // List for every action of a specific type that we pass to it. It creates a non blocking call
import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from  '../../firebase/firebase.utils';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

export function* fetchCollectionsAysnc() {
    
    try {
        const collectionRef = firestore.collection('collections'); 
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch(error) {
        yield put(fetchCollectionsFailure(error.message));
    }
    

    //Think logic below and equivalent saga logic above

    // collectionRef.get().then(snapshot => {
    //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //     dispatch(fetchCollectionsSuccess(collectionsMap));
    // }).catch(error => dispatch(fetchCollectionsFailure(error.message)));

};

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAysnc);
};

export function* shopSagas() {
    yield all([call(fetchCollectionsStart)]);
}