import React, { Component } from 'react';
import Header from './components/Header';
import Socials from './components/Socials';
import Footer from './components/Footer';

class Homepage extends Component {

    render() {
        return (
            <div className="App">
                <Header />
                <section className="homepage center">
                    <div className="banner">
                        <img src="/images/banner_homepage.png" alt="banner" />
                        <h2>Paçoca</h2>
                        <p>O vendedor de doces da escola</p>
                        <a href="/products">Veja meus produtos</a>
                    </div>
                    <div className="recomendation">
                        <h3>Recomendação do Paçoca</h3>
                        <div className="card">
                            <img src="/images/pacoca.png" alt="Imagem de uma paçoca" />
                            <div className="cardText">
                                <h3>Paçoquita</h3>
                                <p>Paçocas Paçoquita, o melhor do amendoim, quem prova comprova.</p>
                                <p>Saindo a 3 por R$1,00.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <Socials />
                <Footer />
            </div>
        )
    }
}
export default Homepage;