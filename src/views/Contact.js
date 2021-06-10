import React, { Component } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Socials from './components/Socials';
import api from '../services/api'

const Form = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <input
                name="email"
                value={props.formvalues.email}
                onChange={props.handleChange}
                required
                type="email"
                placeholder="Email..." />
            <textarea
                name="message"
                value={props.formvalues.message}
                onChange={props.handleChange}
                required
                placeholder="Eu queria pedir aquele doce de chocolate que..." ></textarea>
            <button>Enviar!</button>
        </form>
    )
}

class Contact extends Component {
    state = {
        form: {
            email: '',
            message: ''
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const FieldEmail = event.target.email.value;
        const FieldMessage = event.target.message.value;
        //checar se os campos foram preenchidos
        if (FieldEmail.length > 0 && FieldEmail.indexOf("@") !== -1 && FieldMessage.length > 0) {
            this.sendMail();
        }
    };

    sendMail = () => {
        api.post('/contact', {
            email: this.state.form.email,
            message: this.state.form.message
        }).then(() => {
            const reset = {
                email: '',
                message: ''
            };
            this.setState({ form: reset });
        })
            .catch(err => { console.error(err) })
    };


    handleChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        let newFormState = {
            ...this.state.form
        }
        newFormState[inputName] = inputValue;
        this.setState({ form: newFormState });
    };

    render() {
        return (
            <div className="App">
                <Header />
                <section className="contact center">
                    <div className="formContainer">
                        <h2>Quer pedir um doce especial?</h2>
                        <img src="/images/mailIcon.svg" alt="" />
                        <Form formvalues={this.state.form} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
                    </div>
                    <div className="aboutMe">
                        <img src="/images/author.png" alt="" />
                        <div className="textContainer">
                            <h2>Sobre mim</h2>
                            <p>Sou o Caio, o paçoca, o vendedor de doces da escola XXXXXX. Estou atuando no comercio de doces e guloseimas desde 2012, sempre entregando produtos de qualidade por um preço acessível.</p>
                        </div>
                    </div>
                </section>
                <Socials />
                <Footer />
            </div>
        )
    }
}

export default Contact;