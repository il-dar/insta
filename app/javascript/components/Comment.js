import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom'
import WebpackerReact from 'webpacker-react'

class NewCommentForm extends React.Component{
  constructor(props){
    super(props);
    this.commentRef = React.createRef();
  }
  handleClick(){
    var content = this.commentRef.current.value; //this is available because we did bind(this) on the button render
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
    this.commentRef.current.value = " "
  }
  render(){
    return(
      <div className = "post-comment-form">
        <input className = "btn btn-default" ref={this.commentRef} placeholder='Leave a Comment!' />
          <button className = "btn btn-default comment-submit-btn" onClick={this.handleClick.bind(this)}>Submit</button>
      </div>
    )
  }
}

export default class CommentList extends React.Component{


    constructor(props){
      super(props);
      this.state = {
        data: []
      };
    }


    componentDidMount(){
      var postUrl = this.props.postUrl;
      fetch(`http://localhost:3000${postUrl}.json`)
        .then(response => response.json())
        .then(inData => this.setState({data: inData.comments }));
        this.setState(this.state)
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
        <li className = "comment-li">
          <a className = "pull-left" href = "#">
            <img src={comment.avatar_url} height="50" width="50" className = "comment-avatar"></img>
          </a>
          <div className = "comment comment-single media" key={comment.id}>
            <h3 className = "comment comment-content media-body"><span className = "comment-username">{comment.user_name}   </span><span className = 'comment comment-status' >{comment.status}</span><span className = "comment comment-content">{comment.content}</span></h3>
            <p className = "comment comment-date">On { comment.created_at.slice(0,10)} </p>
            <p>{current_user == comment.user_name ? <button onClick={this.handleClick.bind(this, comment.id)} className = "delete-button"><i class="fa fa-times"></i></button> : null }<button className = "button-like"><i class="fa fa-heart"></i></button><button className = "button-like"><i class="fa fa-reply"></i></button></p>
            </div>
        </li>
      );
    })
    return(
      <div>
        <NewCommentForm
        postUrl={this.props.postUrl}
        handleSubmit={this.handleSubmit}
        />
        <ul className = "comment comment-list">{data}</ul>
      </div>
    )
  }
};
//
// class CommentMap extends React.Component{
//
//
//   render() {
//     const postUrl = this.props.postUrl
//     return (
//       <div className="commentBox">
//           <CommentList
//           current_user={this.props.current_user}
//           postUrl = {this.props.postUrl}
//           />
//       </div>
//     );
//   }
// };
