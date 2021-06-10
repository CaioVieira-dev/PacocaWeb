import React, { Component } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

class ErrorPage extends Component {

    render() {
        return (
            <div className="App">
                <Header />
                <section className="Error center">
                    <h2>ERROR 404 CANDY NOT FOUND</h2>
                </section>

                <Footer />
            </div>
        )
    }
}
export default ErrorPage;