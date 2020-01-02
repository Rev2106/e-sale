import React from 'react'
import axios from 'axios'

import Product from '../components/products/Product'
import Jumbotron from '../components/products/Jumbotron'
import NewProductForm from '../components/products/NewProductForm'
import ErrorMessages from '../components/shared/ErrorMessages'
import ErrorMessagesHOC from '../components/shared/ErrorMessagesHOC'

class ProductList extends React.Component {

    state = {
        products: [],
        serverErrors: [],
        saved: false,
        isFormVisible: false,
        firstLoad: true
    }

    componentDidMount = () => {
        this.loadProductsFromServer()
    }

    componentDidUpdate = () => {
        this.state.firstLoad = false;
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        //console.log('firstLoad = ' + this.state.firstLoad)
        // if (this.state.serverErrors.length !== nextState.serverErrors.length ||
        //     this.state.isFormVisible !== nextState.isFormVisible ||
        //     this.state.firstLoad) {
        //     return true
        // }
        // return false
        return true
    }

    componentDidUpdate = () => {
        if (!this.state.flash && this.props.history.location.state) {
            const flashMsg = this.props.history.location.state.error
            this.setState({ flash: flashMsg }, () => {
                this.props.history.replace('/', null)
            })
        }
    }

    loadProductsFromServer = () => {
        axios.get('/api/v1/products.json').then(response => {
            const { products } = response.data
            this.setState({ products })
        }).catch(error => console.log(error.response.data))
    }

    handleProductSubmit = (data) => {
        const newProduct = {
            product: { ...data }
        }
        axios
            .post('/api/v1/products.json', newProduct)
            .then(response => {
                // const newProducts = this.state.products.concat(response.data.product)
                const newProducts = [ ...this.state.products, response.data.product ]
                this.setState({ 
                    products: newProducts,
                    serverErrors: [],
                    saved: true
                })
            })
            .catch(error => {
                //console.log(error.response.data)
                const msgs = error.response.data
                let currentErrors = [...this.state.serverErrors]
                msgs.forEach((msg) => {
                    if (!currentErrors.includes(msg)) {
                        currentErrors = [...currentErrors, msg]
                    }
                })
                this.setState({ serverErrors: currentErrors})
            })
    }

    handleButtonClick = () => {
        this.setState ({
            isFormVisible: !this.state.isFormVisible
        })
    }

    resetSaved = () => {
        this.setState({
            saved: false,
            serverErrors: [],
            isFormVisible: false
        })
    }

    render() {
        const {products} = this.state
        const productList = products.map(
            (product) => <Product key={product.id} product={product}/>
        )
        return (
            <React.Fragment>
                <Jumbotron />
                {/* {
                    this.state.serverErrors.length > 0 &&
                    <div className="row">
                        <ErrorMessagesHOC
                            errors={[this.state.serverErrors]}
                            colWidth="col-md-10 offset-md-1"
                        />
                    </div>
                } */}
                {
                    this.state.flash &&
                    <div className="row">
                        <ErrorMessagesHOC
                            errors={[this.state.flash]}
                            flash={true}
                            colWidth="col-md-10 offset-md-1"
                        />
                    </div>
                }
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mb-2">
                            <button
                                onClick={this.handleButtonClick}
                                className="btn btn-outline-purple btn-sm"
                            >
                                + New Product
                            </button>
                        </div>
                    </div>
                </div>
                {
                    this.state.isFormVisible && 
                    <NewProductForm 
                        onSubmit={this.handleProductSubmit}
                        serverErrors={this.state.serverErrors}
                        saved={this.state.saved}
                        onResetSaved={this.resetSaved}
                    />
                }
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mb-2">
                            <div className="row">
                                <div className="card-deck">
                                    {productList}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

// const ProductList = () => {
//     return (<div>ProductList Component</div>)
// }

export default ProductList