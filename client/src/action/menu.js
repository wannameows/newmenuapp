import axios from 'axios';
import * as types from '../constants/actionTypes';

export const fetchProductsLoading = (data) => ({
    type: types.FETCH_PRODUCTS_LOADING, show: data
});

export const setProductsItems = (data) => ({
    type: types.SET_PRODUCTS_ITEMS, products: data
});

export const changeMenuItem = (id, value) => ({
    type: types.CHANGE_MENU_ITEM, id, value
})

export const addNewCategory = (id, data, child) => ({
  type: types.ADD_NEW_CATEGORY, id, data, child
})

export const addNewMenuItem = (id, data, child) => ({
  type: types.ADD_NEW_MENU_ITEM, id, data, child
})

function parseMenu(data, fields) {
    let products = [];
    data.forEach((item, index) => {
      iterate(item, index)
    })

    function iterate(item, c, level = 0, prevId = '') {
      if (Array.isArray(item) && item.length > 0) {
        item.forEach(i => {
          iterate(i, c, level, prevId)
        })
      } else if (typeof item === 'object' && item !== null) {
        let id = `${prevId && `${prevId}.`}${item.title}`;
        let field = Object.keys(item).find(i => fields.indexOf(i) !== -1);
        if (field) {
          products.push({ id, c, level, value: item.title })
          iterate(item[field], c, level + 1, id)
        } else {
          products.push({ id, c, level, value: item })
        }
      }
    }
    return products
  }

export const fetchProducts = (data) => {
    return dispatch => {
        const options = {
            method: 'get',
            withCredentials: false,
            url: '/get-menu',
        };

        dispatch(fetchProductsLoading(true));

        axios(options).then(response => {
            dispatch(setProductsItems(parseMenu(response.data, ['categories', 'dishes'])));
            dispatch(fetchProductsLoading(false));
        }).catch(function (error) {
            dispatch(fetchProductsLoading(false));
            console.log(error);
            debugger; // OK
        });
      };
};
