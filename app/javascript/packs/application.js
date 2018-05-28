/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom'
import Comment from '../components/Comment'
import WebpackerReact from 'webpacker-react'
import regeneratorRuntime from "regenerator-runtime";


document.addEventListener("DOMContentLoaded", () => {
  // console.log('container', container)
    const node = document.getElementById('comments_data')
    const current_user = node.getAttribute('current_user')
    const postUrl = node.getAttribute('content')
    const data = {data: []};
    fetch(`http://localhost:3000${postUrl}/comments.json`)
            .then(response => response.json())
            .then(inData => data.data = inData.comments);
    render(
      <Comment
      postUrl={postUrl}
      current_user={current_user}
      data = {data}
      />,
      document.getElementById('react').appendChild(document.createElement('div')),
    )
  });
