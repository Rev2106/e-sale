import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import ErrorMessages from '../components/shared/ErrorMessages'
import ProductForm from '../components/products/ProductForm'
import withProductForm from '../components/products/WithProductForm'

class EditProductForm extends Component {
  state = {
    serverErrors: [],
    saved: false
  }

  componentDidMount = () => {
    const id = this.props.match && +this.props.match.params.id
    if (id) {
      this.getProduct(id)
    }
  }

  componentWillUnmount = () => {
    const id = this.props.match && this.props.match.params.id
    id && this.props.onEdit("edited")
    this.props.onUpdate(false)

    if (this.state.serverErrors.length > 0) {
      this.resetSaved()
    }
  }

  getProduct = (id) => {
    axios
      .get(`/api/v1/products/${id}.json`)
      .then(response => {
        const product = response.data.product
        const idx = product.price.search(/\d/)
        product.price = product.price.slice(idx)

        this.props.onSetFields(product, () => {
          this.props.onEdit()
        })
        // this.setState({
        //   id: product.id,
        //   name: product.name,
        //   description: product.description,
        //   price: product.price,
        //   quantity: product.quantity
        // }, () => {
        //   this.props.onEdit()
        // })
      })
      .catch(error => console.log(error))
  }

  resetSaved = () => {
    this.setState({
      saved: false,
      serverErrors: []
    })
  }

  handleSubmit = (event) => {
    this.props.onSubmit(event, this.handleProductUpdate)
  }

  handleProductUpdate = (data) => {
    const updatedProduct = {
      product: {...data}
    }
    axios
      .put(`/api/v1/products/${data.id}.json`, updatedProduct)
      .then(response => {
        const {product} = response.data
        this.setState({
          serverErrors: [],
          saved: true
        }, () => {
          this.props.onSetFields(product)
          this.props.onUpdate(true)
          this.props.history.push(`/products/${data.id}`)
        })
      })
      .catch(error => {
        const updatedErrors = [
          ...this.state.serverErrors,
          ...error.response.data
        ]
        const errorsSet = new Set(updatedErrors)
        this.setState({ serverErrors: [...errorsSet]})
      })
  }

  render() {
    const buttonText = 'Update Product'
    const title = 'Editing Product'

    return (
      <div className="container">
        {this.state.serverErrors.length > 0 &&
        <ErrorMessages errors={this.state.serverErrors}></ErrorMessages>
        }
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="card panel-div">
              <h1 className="text-center form-header-style pt-2 pb-3">
                {title}
              </h1>
              <ProductForm
                onSubmit={this.handleSubmit}
                state={this.props.state}
                onChange={this.props.onChange}
                onBlur={this.props.onBlur}
                buttonText={buttonText}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

EditProductForm.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
}

export default withProductForm(EditProductForm)
