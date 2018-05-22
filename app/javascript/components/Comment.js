import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom'
import WebpackerReact from 'webpacker-react'

class NewCommentForm extends React.Component{

  handleClick(){
    var content = this.refs.comment.value; //this is available because we did bind(this) on the button render
    var postUrl = this.props.postUrl
    $.ajax({
      url: postUrl,
      type: "POST",
      data: { comment: { content: content } },
      dataType: 'json',
      success: response => {
        response.status = ' New '
        console.log(response)
        // var responseWithNew = response.concat(displayWithNew)
        this.props.handleSubmit(response);
      }
    });
  }
  render(){
    return(
      <div>
        <input ref='comment' placeholder='Leave a Comment!' />
          <button onClick={this.handleClick.bind(this)}>Submit</button>
      </div>
    )
  }
}

class CommentList extends React.Component{

    // componentDidMount(){
    //   this.setState({
    //     data: this.props.data
    //   })
    // }
    // /posts/:post_id/comments/:id
    constructor(props){
      super(props);
      this.state = {
        data: this.props.data
      };
    }
    componentWillMount(){
      fetch('http://localhost:3000/posts/9/comments.json')
        .then(response => response.json())
        .then(inData => this.setState({data: inData.comments }));
    }

    handleSubmit = (comment) => {
      comment.user_name = this.props.current_user
      var newState = this.state.data.concat(comment)
      this.setState({data: newState});
    }

    handleDelete(comment){
      var filteredData = this.state.data.filter((comments) => {
        return comments.id != comment.id
      });
      this.setState({data: filteredData})
    }

    handleClick(id){
      var postUrl = this.props.postUrl
      // var postUrlArray = postUrl.split('/')
      // var postId = postUrlArray[1]
      var commentUrl = postUrl.concat(`/${id}`)
      commentUrl = commentUrl.concat('.json')
      $.ajax({
        url: commentUrl,
        type: "DELETE",
        dataType: 'json',
        success: response => {
          this.handleDelete(response);
          console.log("item deleted pressed 1")
        }
      });
    }

  render() {
    var current_user = this.props.current_user
    var data= this.state.data.map(comment => {
    return(
        <div className = "comment comment-single" key={comment.id}>
        <h3 className = "comment comment-content">{comment.user_name} {comment.content} <span className = 'comment comment-status' >{comment.status} </span></h3>
        <p className = "comment comment-date">On { comment.created_at.slice(0,10)} </p>
        <p>{current_user == comment.user_name ? <button onClick={this.handleClick.bind(this, comment.id)} className = "delete-button">Delete</button> : null }</p>
  </div>
      );
    })
    return(
      <div>
        <div className = "comment comment-list">{data}</div>
        <NewCommentForm
        postUrl={this.props.postUrl}
        handleSubmit={this.handleSubmit}
      />
      </div>
    )
  }
};

export default class CommentBox extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  render() {
    const postUrl = this.props.postUrl
    return (
      <div className="commentBox">
          <CommentList
          data={this.state.data}
          current_user={this.props.current_user}
          postUrl = {this.props.postUrl}
          />
      </div>
    );
  }
};
