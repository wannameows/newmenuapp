import * as types from '../constants/actionTypes';

const initialState = {
    'loading': false,
    'products': [],
};

export default function productsReducer(state = initialState, action) {
	switch(action.type) {
        case types.FETCH_PRODUCTS_LOADING:
            return {
                ...state,
                loading: action.show,
            }

        case types.SET_PRODUCTS_ITEMS:
            return {
                ...state,
                products: action.products,
            }

        case types.CHANGE_MENU_ITEM:
            return {
                ...state,
                products: state.products.map(p => {
                  if (p.id === action.id) {
                    p.value = action.value;
                  }
                  return p
                })
            }

        case types.ADD_NEW_MENU_ITEM:
          let newProducts = JSON.parse(JSON.stringify(state.products));
          newProducts.splice(
            action.child ? state.products.map(p => p.id).indexOf(action.id) + 1 : state.products.map(p => p.id).indexOf(action.id),
            0,
            action.data
          );
          return {
              ...state,
              products: newProducts
          }

        case types.ADD_NEW_CATEGORY:
            let newCategoryProducts = JSON.parse(JSON.stringify(state.products));
            newCategoryProducts.splice(
              action.child ? state.products.map(p => p.id).indexOf(action.id) + 1 : state.products.map(p => p.id).indexOf(action.id),
              0,
              action.data
            );
            return {
                ...state,
                products: newCategoryProducts
            }

        default:
            return state;
    }
}
