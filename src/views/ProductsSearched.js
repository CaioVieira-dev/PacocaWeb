import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import api from '../services/api';   //axios

import Footer from './components/Footer';
import Header from './components/Header';


const Search = (props) => {
    return (
        <div className="search">
            <img src="/images/bgbusca.png" alt="" />
            <h2>Os melhores doces da região</h2>
            <form onSubmit={props.handleSubmit} id="search" name="search">
                <input
                    type="text"
                    name="searchBar" id=""
                    placeholder="Encontre seu doce favorito!"
                    onChange={props.handleChange}
                />
                <span onClick={props.handleSubmit}><img
                    src="/images/searchIcon.svg" alt=""
                    onClick={props.handleSubmit} /></span>
            </form>
        </div>
    )
}

const Catalog = (props) => {
    return (
        <div className="catalog center">
            <h3>Produtos encontrados</h3>
            {props.products.length === 0 ?
                (<p>Carregando</p>)
                :
                (props.products.map((product, id) => <Card key={id} pageUrl={props.url} setRedirect={props.setRedirect} product={product} />)
                )}
        </div>
    )
}

const Card = (props) => {
    const pricing = props.product.pricing.trim();
    const promo = props.product.promo.trim();
    const pricingText = pricing.slice(0, pricing.lastIndexOf(" "));
    const pricingPrice = pricing.slice(pricing.lastIndexOf(" "), pricing.length);
    const promoText = promo.slice(0, promo.lastIndexOf(" "));
    const promoPrice = promo.slice(promo.lastIndexOf(" "), promo.length);

    const redirectUrl = props.pageUrl + "/" + props.product.id;

    return (
        <div className="card" >
            <div className="onclickOverlay"
                data-redirecturl={redirectUrl}
                onClick={props.setRedirect(redirectUrl)}></div>
            <img src={props.product.image} alt="foto do produto" />
            <div className="description">
                <h3 >{props.product.name}</h3>
                <p >{props.product.description}</p>
                <p ><span>{pricingText}</span><span>{pricingPrice}</span></p>
                <p ><span>{promoText}</span><span>{promoPrice}</span></p>
            </div>

            <div className="flavours">
                {props.product.flavours.length > 0 ? <p>Sabores:</p> : ""}
                <ul >
                    {props.product.flavours.length > 0 ?
                        props.product.flavours.map((flavor, i) => { return <li key={i}>{flavor}</li> })
                        :
                        ""}
                </ul>
            </div>
        </div>

    )
}

class ProductsSearched extends Component {
    state = {
        query: this.props.match.params.productName,
        redirect: null,
        products: [],
        search: '',
    };

    componentDidMount() {
        this.getProducts();
    };
    componentDidUpdate() {
        //atualiza a pagina quando o parametro productName da url muda,
        //porque o react não vai carregar o site do contrario
        if (this.props.match.params.productName !== this.state.query) {
            window.location.reload();
        }
    }
    handleRedirect = (e) => {
        this.setState({ redirect: e.target.dataset.redirecturl })
    }
    getProducts = () => {
        api.post(`/products/find/${this.state.query}`, {
            productName: this.state.query,
        })
            .then((res) => {
                this.setState({ products: res.data })
            })
            .catch((err) => {
                console.error(err)
                return null;
            });
    };
    handleChange = (event) => {
        const newState = event.target.value;
        this.setState({ search: newState })
    };
    handleSubmit = (event) => {
        event.preventDefault();
        const FieldSearchBar = this.state.search;

        if (FieldSearchBar.length > 0) {
            this.findProducts();
        }
    };
    findProducts = () => {
        api.post(`/products/find/${this.state.search}`, {
            productName: this.state.search
        })
            .then(() => {
                const redir = `/products/find/${this.state.search}`
                this.setState({ redirect: redir })
            })
            .catch((err) => { console.error(err) })
    };
    render() {
        const baseUrl = '/products';
        if (this.state.redirect) {
            //retorna a classe Redirect, 
            //e redireciona para o valor do estado redirect 
            return <Redirect to={this.state.redirect} from={this.props.match.url} />
        }

        return (
            <div className="App">
                <Header />
                <section className="products center">
                    <Search handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
                    {this.state.products.length === 0 ?
                        (<p>Carregando</p>)
                        :
                        this.state.products === 'Product not found' ?
                            <h2 className="error">O produto "{this.state.query}" não foi encontrado</h2>
                            :
                            (<Catalog
                                setRedirect={() => (this.handleRedirect)}
                                url={baseUrl}
                                products={this.state.products}
                            />)
                    }
                </section>
                <Footer />
            </div>
        )
    }
}

export default ProductsSearched;