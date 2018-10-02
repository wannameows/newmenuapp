import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {fetchProducts, changeMenuItem, addNewCategory, addNewMenuItem} from '../action/menu';

import Loading from '../components/Loading';
import ProductsList from '../components/ProductsList';

class MainContainer extends Component {

    componentDidMount() {
        this.props.fetchProducts();
    }

    render() {
        const {loading, products, changeMenuItem, addNewCategory, addNewMenuItem} = this.props;

        if(loading) return (
            <StyledLoaderWrapper>
                <Loading />
            </StyledLoaderWrapper>
        );

        return (
            <StyledWrapper>
                <ProductsList products={products} changeMenuItem={changeMenuItem} addNewCategory={addNewCategory} addNewMenuItem={addNewMenuItem} />
            </StyledWrapper>
        );
  }
}

const StyledLoaderWrapper = styled.div`
    width: 750px;
    margin: 0 auto;
    min-height: 500px;
    display: flex;
`;

const StyledWrapper = styled.div`
    width: 750px;
    margin: 0 auto;
    min-height: 500px;
`;

const mapStateToProps = state => {
    const {loading, products} = state.productsReducer;

    return {
        loading,
        products
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
        fetchProducts: () => {
          return dispatch(fetchProducts());
        },
        changeMenuItem: (id, value) => {
          return dispatch(changeMenuItem(id, value));
        },
        addNewCategory: (id, data, child) => {
          return dispatch(addNewCategory(id, data, child));
        },
        addNewMenuItem: (id, data, child) => {
          return dispatch(addNewMenuItem(id, data, child));
        }
    };
  };


export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
