import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MdLink from 'react-icons/lib/md/link';
import ShortenedURL from './ShortenedURL';
import { DOMAIN } from './config';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      originalURL: null,
      shortenedURL: null,
      error: false,
      errorMessage: 'Se ha producido un error al generar la url acortada'
    }
  }

  handleError = () => {
    console.error(this.state.errorMessage);
    this.setState({
      error: true
    });
  }

  shortURL = (evt) => {
    evt.preventDefault();
    console.log(`URL a acortar: ${this.state.originalURL}`);
    fetch(DOMAIN + '/api/shortenURL', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        originalURL: this.state.originalURL,
      }),
    }).then(response => {
      if (response.status == 201) {
        let data = response.json();
        data.then(response => {
          let shortenedURL = response.shortenedURL;
          console.log(`URL ${this.state.originalURL} acortada en ${shortenedURL}`);
          this.setState({
            shortenedURL: shortenedURL,
            error: false
          })
        });
      } else {
        this.handleError();
      }
    }).catch((response) => {
      this.handleError();
    });
  }

  render() {
    return (
      <div className="container">
        <div className="item">
          <h1> Acortador de URLs <MdLink /></h1>
        </div>
        <div className="item item-url">
          <form onSubmit={this.shortURL}>
            <input id="url"
              type="url"
              name="url"
              required="true"
              onChange={evt => this.setState({ originalURL: evt.target.value })}
              placeholder="Pegue un enlace..." />
            <button> Acortar </button>
          </form>
        </div>
        <div className="item">{!this.state.error ? <ShortenedURL shortenedURL={this.state.shortenedURL} /> : this.state.errorMessage}</div>
      </div>
    );
  }
}

export default App;
