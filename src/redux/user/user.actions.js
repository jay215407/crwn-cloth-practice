import { USerActionTpes } from './user.types';

export const setCurrentUser = user => {
    return {
        type: USerActionTpes.SET_CURRENT_USER,
        payload: user
    }
};