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
const Recomendations = (props) => {

    return (
        <div className="recomendations">
            <h3>Recomendações do Paçoca</h3>
            <div className="card">
                <div className="onclickOverlay"
                    data-redirecturl={`${props.url}/1`}
                    onClick={props.setRedirect()}
                ></div>
                <img src="/images/pacoca.png" alt="foto de uma paçoca" />
                <div className="cardText">
                    <h3>Paçoquita</h3>
                    <p>Paçocas Paçoquita, o melhor do amendoim, quem prova comprova.</p>
                    <p>Saindo a 3 por R$1,00.</p>
                </div>
            </div>
            <div className="card">
                <div className="onclickOverlay"
                    data-redirecturl={`${props.url}/2`}
                    onClick={props.setRedirect()}
                ></div>
                <img src="/images/balachita.png" alt="foto de um pacote de bala chita" />
                <div className="cardText">
                    <h3>Balas Chita</h3>
                    <p>As clássicas balas chita, em diversos sabores para cada cliente.</p>
                    <p>Saindo avulsa a R$0,05 e o pacote com 12 saindo a R$0,50.</p>
                </div>
            </div>
        </div>
    )
}
const Catalog = (props) => {
    return (
        <div className="catalog center">
            <h3>Catalogo</h3>
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

class Products extends Component {
    state = {
        redirect: null,
        products: [],
        search: ''
    };

    componentDidMount() {
        this.getProducts();
    };
    handleRedirect = (e) => {
        this.setState({ redirect: e.target.dataset.redirecturl })
    }
    getProducts = () => {
        api.get("/products")
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
                const redir = `${this.props.match.url}/find/${this.state.search}`
                this.setState({ redirect: redir })
            })
            .catch((err) => { console.error(err) })
    }
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
                    <Recomendations setRedirect={() => (this.handleRedirect)} url={baseUrl} />
                    {this.state.products.length === 0 ?
                        (<p>Carregando</p>)
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

export default Products;