import React, { Component } from 'react';

class Header extends Component {

    render() {

        return (
            <header className="center">
                <span><a href="/">PaçocaWeb</a></span>
                <nav>
                    <ul>
                        <li><a href="/products">Produtos</a></li>
                        <li><a href="/contact">Contato</a></li>
                    </ul>
                </nav>
            </header>
        );
    }

}

export default Header;