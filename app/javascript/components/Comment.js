import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom'
import WebpackerReact from 'webpacker-react'

class NewCommentForm extends React.Component{
  // getData(){
  //   $.ajax({
  //
  //   })
  // }
  handleClick(){
    var content = this.refs.comment.value; //this is available because we did bind(this) on the button render
    var postUrl = this.props.postUrl
    $.ajax({
      url: postUrl,
      type: "POST",
      data: { comment: { content: content } },
      dataType: 'json',
      success: response => {
        this.props.handleSubmit(response);
      }
    });
  }
  render(){
    return(
      <div>
        <input ref='comment' placeholder='Comment' />
          <button onClick={this.handleClick.bind(this)}>Submit</button>
      </div>
    )
  }
}

// class SingleComment extends React.Component{
//   render() {
//     return (
//       <div>
//       This comment number is {this.props.id}
//       <h2>
//       {this.props.content}
//       </h2>
//       </div>
//     )
//   }
// };

class CommentList extends React.Component{
// componentWillReceiveProps (props){
//  // this.doSomething(props) // To some function.
//  this.setState({data: props}) // This will update your component.
// }
  render() {
    var current_user = this.props.current_user
    var data= this.props.data.map(comment => {
    return(
        <div key={comment.id}>
        <h3>{comment.user_name} {comment.content}  </h3>

          <p>On { comment.created_at.slice(0,10)} </p>
        </div>
      );//
    })
    return <div>{data}</div>
  }
};
//
// class CommentForm extends React.Component{
//   render() {
//     return (
//       <div className="commentForm">
//         Party Parrot time. I am a CommentForm.
//       </div>
//     );
//   }
// };
//
export default class CommentBox extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount(){
    fetch('http://localhost:3000/posts/9/comments.json')
      .then(response => response.json())
      .then(inData => this.setState({data: inData.comments }));
  }

  handleSubmit = (comment) => {
    comment.user_name = this.props.current_user
    var newState = this.state.data.concat(comment)
    this.setState({data: newState});
  }
  render() {
    const postUrl = this.props.postUrl
    return (
      <div className="commentBox">
          <CommentList
          data={this.state.data}
          current_user={this.props.current_user}
          />
          <NewCommentForm
          postUrl={postUrl}
          handleSubmit={this.handleSubmit}
          />
      </div>
    );
  }
};
