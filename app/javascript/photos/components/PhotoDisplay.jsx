import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

class PhotoDisplay extends React.Component {
  constructor () {
    super();
    this.state = {
      photo: {}
    };
  }

  fetchPhoto (id) {
    axios.get( `api/photos/${id}` )
        .then(response => {
          this.setState({ photo: response.data });
        })
        .catch(error => {
          console.error(error);
        });
  }

  setPhotoIdFromQueryString (qs) {
    this.qsParams = queryString.parse(qs);
    if (this.qsParams.photo) {
      // assign photo ID from the URL's query string
      this.photoId = Number(this.qsParams.photo);
    } else {
      this.photoId = 1;
      // update URL in browser to reflect current photo in query string
      this.props.history.push(`/?photo=${this.photoId}`);
    }
  }

  componentDidMount () {
    this.setQuoteIdFromQueryString(this.props.location.search);
    this.fetchQuote(this.photoId);
  }

  componentWillReceiveProps (nextProps) {
    this.setQuoteIdFromQueryString(nextProps.location.search);
    this.fetchQuote(this.photoId);
  }

  render () {
    const nextQuoteId = Number(this.state.photo.id) + 1;

    return (
      <div>
        <Link to={`/?photo=${nextQuoteId}`}>Next</Link>
        <p>{this.state.photo.text}</p>
        <p>{this.state.photo.author}</p>
      </div>
    );
  }
}

export default QuotesDisplay;
