import React, { Component } from 'react'
import styled from 'styled-components';

class Product extends Component {

    constructor(props) {
      super(props);
      this.state = {
        editMode: false,
        product: props.data,
        addModal: false,
        addModalData: null
      }
    }

    componentDidMount() {
      window.addEventListener('click', this.handleWindowClick);
    }

    componentWillUnmount() {
      window.removeEventListener('click', this.handleWindowClick);
    }

    handleWindowClick = () => {
      this.setState({ editMode: false, addModal: false })
    }

    changeMode = e => {
      e.stopPropagation()
      this.setState(state => ({ editMode: !state.editMode }))
    }

    renderItem = value => {
      switch (typeof value) {
        case 'object':
          return Array.isArray(value) ? value.join(', ') : '';
        default:
          return `${value}`
      }
    }

    handleChange = (e, key) => {
      this.props.changeMenuItem(this.state.product.id, { ...this.state.product.value, [key]: e.target.value });
    }

    render () {
      const { value, level } = this.state.product;
      const marginLeft = 15*level;
      return (
        <ProductWrapper onClick={this.changeMode} marginLeft={marginLeft}>
          <div style={{ flex: 1 }}>
            {
              Object.keys(value).map((key, index) => (
                <ProductField key={index}>
                  <ProductKey>{key}:</ProductKey>
                  {
                    this.state.editMode ? (
                      <StyledInput
                        value={this.renderItem(value[key])}
                        onClick={e => e.stopPropagation()}
                        onChange={e => this.handleChange(e, key)}
                      />
                    ) : (
                      <ProductValue>{this.renderItem(value[key])}</ProductValue>
                    )
                  }
                </ProductField>
              ))
            }
          </div>
        </ProductWrapper>
      );
    }
}

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px 0px 10px ${props => props.marginLeft}px;
  padding: 5px;
  border: 1px solid #000;
  cursor: pointer;
`;

const ProductField = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: 300;
  font-size: 14px;
`

const ProductKey = styled.p`
  margin: 0;
  text-transform: uppercase;
`

const ProductValue = styled(ProductKey)`
  font-style: italic;
`

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid #000;
  &:focus {
    outline: none;
  }
`

export default Product
