import React, { Component } from 'react';
import './ShortenedURL.css';

export default class ShortenedURL extends Component {

  render() {
    return (<a target="_blank" href={this.props.shortenedURL}>{this.props.shortenedURL}</a>);
  }
}
