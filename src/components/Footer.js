import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <footer className="footer">
        <div class="about">
        <p>© Doll Collector by Olga Dokukova, 2019</p>
          <p><a target="_blank" rel="noopener noreferrer" href="https://slides.com/olga1305/doll-collector/#/">About the project</a></p>
        </div>
      </footer>
    );
  }
}

export default Footer;
