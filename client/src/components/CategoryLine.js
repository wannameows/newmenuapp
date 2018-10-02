import React, { Component } from 'react'
import styled from 'styled-components';

class CategoryLine extends Component {
    state = {
      addModal: false,
      addValue: '',
      addMenuItemModal: false,
      addModalData: null,
      child: false
    }

    componentDidMount() {
      window.addEventListener('click', this.handleWindowClick);
    }

    componentWillUnmount() {
      window.removeEventListener('click', this.handleWindowClick);
    }

    handleWindowClick = () => {
      this.setState({ addModal: false, addMenuItemModal: false })
    }

    handleChange = e => {
      this.setState({ addValue: e.target.value })
    }

    handleProductAddChange = (e, key) => {
      let data = this.state.addModalData ? { ...this.state.addModalData } : {};
      data[key] = e.target.value.indexOf(',') !== -1 ? e.target.value.split(',') : e.target.value;
      this.setState({ addModalData: data });
    }

    saveCategory = () => {
      if (this.state.addValue) {
        let { c, id, level, value } = this.props.item;
        this.props.addNewCategory(
          id,
          {
            id: `${this.state.child ? id : id.replace(value, '')}${this.state.addValue}`,
            c,
            level: this.state.child ? level + 1 : level,
            value: this.state.addValue
          },
          this.state.child
        );
        this.setState({ addModal: false });
      }
    }

    saveNewProduct = e => {
      e.stopPropagation();
      let obj = { ...this.state.addModalData };
      let { c, id, level, value } = this.props.item;
      ['title', 'fillers', 'price'].forEach(key => {
        if (!obj[key]) obj[key] = '';
      })
      this.props.addNewMenuItem(
        id,
        {
          id: `${this.state.child ? id : id.replace(value, '')}${obj.title}`,
          c,
          level: this.state.child ? level + 1 : level,
          value: obj
        },
        this.state.child
      );
      this.setState({ addMenuItemModal: false });
    }

    render () {
        const { item } = this.props;
        const marginLeft = 15*item.level;

        return (
            <StyledContainer marginLeft={marginLeft}>
                <p>{item.value}</p>
                {
                  this.state.addModal ? (
                    <AddModalWrapper onClick={e => e.stopPropagation()}>
                      <StyledModalInput onChange={this.handleChange} />
                      <ConfirmButton onClick={this.saveCategory}>Save</ConfirmButton>
                    </AddModalWrapper>
                  ) : (
                    this.state.addMenuItemModal ? (
                      <ProductAddForm>
                        {
                          ['title', 'fillers', 'price'].map((key, index) => (
                            <ProductField key={index}>
                              <ProductKey>{key}:</ProductKey>
                              <StyledInput
                                onClick={e => e.stopPropagation()}
                                onChange={e => this.handleProductAddChange(e, key)}
                              />
                            </ProductField>
                          ))
                        }
                        <ProductSave onClick={this.saveNewProduct}>Save</ProductSave>
                      </ProductAddForm>
                    ) : (
                      <div style={{ display: 'flex' }}>
                        <CategoryAdd onClick={e => {
                          e.stopPropagation();
                          this.setState({ addModal: true, child: false });
                        }}>Add similar category</CategoryAdd>
                        <CategoryAdd onClick={e => {
                          e.stopPropagation();
                          this.setState({ addMenuItemModal: true, child: false });
                        }}>Add similar item</CategoryAdd>
                        <CategoryAdd onClick={e => {
                          e.stopPropagation();
                          this.setState({ addMenuItemModal: true, child: true });
                        }}>Add child item</CategoryAdd>
                        <CategoryAdd onClick={e => {
                          e.stopPropagation();
                          this.setState({ addModal: true, child: true });
                        }}>Add child category</CategoryAdd>
                      </div>
                    )
                  )
                }
            </StyledContainer>
        )
    }
}

const StyledContainer = styled.div`
    display: flex;
    margin-left: ${props => props.marginLeft}px;
    &:hover {
      button {
        display: flex;
      }
    }
`;

const CategoryAdd = styled.button`
    display: none;
    height: 20px;
    align-self: center;
    margin-left: 10px;
    cursor: pointer;
`;

const AddModalWrapper = styled.div`
    display: flex;
    height: 20px;
    align-self: center;
    margin-left: 10px;
`

const StyledModalInput = styled.input`

`

const ConfirmButton = styled.button`

`

const ProductAddForm = styled.div`
  display: flex;
  width: 200px;
  position: absolute;
  padding: 20px;
  flex-direction: column;
  background: #fafafa;
`

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

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid #000;
  &:focus {
    outline: none;
  }
`

const ProductAdd = styled.button`
    display: flex;
    height: 35px;
    align-self: center;
    margin-left: 10px;
    cursor: pointer;
`;

const ProductSave = styled(ProductAdd)`
    align-self: stretch;
    height: 20px;
    margin: 10px 0px 0px 0px;
    justify-content: center;
`

export default CategoryLine
