import React, { Component } from 'react';

class Socials extends Component {

    render() {
        return (
            <section className='socials center'>

                <h3>Me encontre nas redes sociais!</h3>
                <div className="row">
                    <p className="cell"><img src="/images/facebookIcon.png" alt="" /> <a href="https://www.facebook.com/CaioVieira.Dev" rel="noreferrer" target="_blank">Facebook</a></p>
                    <p className="cell"><img src="/images/instagramIcon.png" alt="" /> <a href="https://www.instagram.com/caiovieira_dev/" rel="noreferrer" target="_blank">Instagram</a></p>
                </div>
                <div className="row">
                    <p className="cell"><img src="/images/linkedinIcon.png" alt="" /> <a href="https://www.linkedin.com/in/caio-vieira-b1aab9201/" rel="noreferrer" target="_blank">Linkedin</a></p>
                    <p className="cell"><img src="/images/githubIcon.png" alt="" /> <a href="https://github.com/CaioVieira-dev" rel="noreferrer" target="_blank">GitHub</a></p>

                </div>
            </section>
        )
    }
}

export default Socials;