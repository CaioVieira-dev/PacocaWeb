import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../services/api'

import Footer from './components/Footer';
import Header from './components/Header';

const Product = (props) => {
    const pricing = props.product.pricing.trim();
    const promo = props.product.promo.trim();
    const pricingText = pricing.slice(0, pricing.lastIndexOf(" "));
    const pricingPrice = pricing.slice(pricing.lastIndexOf(" "), pricing.length);
    const promoText = promo.slice(0, promo.lastIndexOf(" "));
    const promoPrice = promo.slice(promo.lastIndexOf(" "), promo.length);

    const flavours = props.product.flavours;

    let flavourList;
    if (flavours.length > 0) {
        flavourList = <FlavourList flavours={flavours} />;
    }
    return (
        <div className="product">
            <h2>{props.product.name}</h2>
            <img src={props.product.image} alt="" />
            <p>{props.product.description}</p>
            <p><span>{pricingText}</span><span>{pricingPrice}</span></p>
            <p><span>{promoText}</span><span>{promoPrice}</span></p>
            {flavourList}
        </div>
    )
};
const FlavourList = (props) => {
    return (
        <div className="flavours">
            <h3>Sabores disponiveis</h3>
            <ul>
                {props.flavours.map((flavor, i) => { return <li key={i}>{flavor}</li> })}
            </ul>
        </div>
    )
};
const ReservForm = (props) => {
    return (
        <div className="formContainer">
            <h2>Reserve algumas para você</h2>
            <form onSubmit={props.handleSubmit}>
                <div className="row">
                    <label htmlFor="name" className="sr-only">Nome</label>
                    <input
                        name="name"
                        value={props.formval.name}
                        onChange={(e) => props.updateForm(e)}
                        placeholder="Nome"
                        type="text"
                        required />

                    <label htmlFor="class" className="sr-only">Turma</label>
                    <input
                        name="class"
                        value={props.formval.class}
                        onChange={(e) => props.updateForm(e)}
                        type="text"
                        placeholder="Sala"
                        required />

                </div>
                <div className="row">
                    <label htmlFor="quantity">Quantas você vai querer?</label>
                    <input
                        name="quantity"
                        value={props.formval.quantity}
                        onChange={(e) => props.updateForm(e)}
                        type="number"
                        id="quantity"
                        required />
                </div>
                <label htmlFor="message" className="sr-only">Quer me falar mais alguma coisa?</label>
                <textarea
                    name="message"
                    value={props.formval.message}
                    onChange={(e) => props.updateForm(e)}
                    placeholder="Quer me falar mais alguma coisa?" ></textarea>
                <button type="submit" >Enviar!</button>
            </form>
        </div>
    )
}

class ProductSingle extends Component {
    state = {
        product: [],
        id: this.props.match.params.productId,
        form: {
            name: '',
            class: '',
            quantity: '',
            message: '',
            product: ''
        },
    };
    componentDidMount() {
        this.getProduct();
    };
    getProduct = () => {
        api.get(`/products/${this.state.id}`)
            .then((res) => {
                this.setState({ product: res.data });
                if (res.data !== 'not found') {
                    const updateForm = { ...this.state.form }
                    updateForm.product = res.data.name
                    this.setState({ form: updateForm });
                }
            })
            .catch((err) => {
                console.error(err)
                return null;
            });
    };
    setForm = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        let newFormState = {
            ...this.state.form
        }
        newFormState[inputName] = inputValue;
        this.setState({ form: newFormState });
    };
    sendMail = () => {
        api.post(`/products/${this.state.id}`, {
            name: this.state.form.name,
            class: this.state.form.class,
            quantity: this.state.form.quantity,
            message: this.state.form.message,
            product: this.state.form.product
        }).then(() => {
            const reset = {
                name: this.state.form.name,
                class: '',
                quantity: '',
                message: '',
                product: ''
            }
            this.setState({ form: reset })
        })
            .catch(err => { console.error(err) });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        const FieldName = this.state.form.name;
        const FieldClass = this.state.form.class;
        const FieldQuantity = this.state.form.quantity;

        if (FieldName.length > 0 && FieldClass.length > 0 && FieldQuantity.length > 0) {
            this.sendMail();
            const reset = {
                name: '',
                class: '',
                quantity: '',
                message: '',
                product: this.state.product.name
            };
            this.setState({ form: reset });
        }
    };

    render() {
        return (
            <div className="App">
                <Header />
                <section className="productSingle center">
                    {this.state.product.length === 0 ?
                        <p>carregando</p>
                        :
                        this.state.product === 'not found' ? <Redirect to="/404" /> : <Product product={this.state.product} />
                    }
                    <ReservForm formval={this.state.form} handleSubmit={this.handleSubmit} updateForm={this.setForm} />
                </section>
                <Footer />
            </div>
        )
    }
}

export default ProductSingle;