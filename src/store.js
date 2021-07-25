import { get, writable } from 'svelte/store';

function createStore(initialState) {
    const { subscribe, set, update } = writable(initialState);
    return {
        subscribe,
        set,
        update,
        reset: () => {
            set(initialState);
        }
    }
};

const stores = {
    auth: createStore({})
};

export const getStore = (key) => {
    return stores[key];
};
export const getState = (key) => {
    return get(getStore(key))
};
export const reset = () => {
    Object.keys(stores).forEach((storeKey) => {
        stores[storeKey].reset();
    })
};
