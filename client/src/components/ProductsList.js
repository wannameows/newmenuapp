import React, { Component } from 'react';
import styled from 'styled-components';
import Product from './Product';
import CategoryLine from './CategoryLine';

class ProductsList extends Component {

    renderItems = () => {
        const { products, changeMenuItem, addNewCategory, addNewMenuItem } = this.props;

        const categories = products.map((item, index) => {

            if(typeof item.value === 'string') {
                return <CategoryLine addNewCategory={addNewCategory} key={`${item.id}.${index}`} item={item} addNewMenuItem={addNewMenuItem} />
            } else {
                return (
                    <Product data={item} key={`${item.id}.${index}`} changeMenuItem={changeMenuItem} addNewMenuItem={addNewMenuItem} />
                )
            }
        });
        return categories;
    }

    render () {
        return (
            <StyledUl>
                {this.renderItems()}
            </StyledUl>
        )
    }
}

const StyledUl = styled.div`
    padding: 0;
`;

export default ProductsList
