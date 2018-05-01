import React from 'react';


class NewCommentForm extends React.Component{
  handleClick(){
    var content = this.refs.comment.value; //this is available because we did bind(this) on the button render
    var postUrl = this.props.postUrl
    $.ajax({
    url: postUrl,
    type: "POST",
    data: { comment: { content: content } },
    success: response => {
      console.log("it worked!", response);
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

class SingleComment extends React.Component{
  render() {
    return (
      <div>
      This comment number is {this.props.id}
      <h2>
      {this.props.content}
      </h2>
      </div>
    )
  }
};

class CommentList extends React.Component{

  render() {
    const postUrl = this.props.postUrl
  return(
    <div>
      hello
      { this.props.data.map((comment) =>
        <SingleComment
        key={comment.id}
        id={comment.id}
        content={comment.content}
        />
      )}
      <NewCommentForm postUrl={postUrl}/>
    </div>
  )
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
  render() {
    const data = this.props.data
    const postUrl = this.props.postUrl
    return (
      <div className="commentBox">
          <CommentList
          data={data}
          postUrl={postUrl}
          />
      </div>
    );
  }
};
