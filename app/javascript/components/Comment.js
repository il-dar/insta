import React from 'react';


class NewComment extends React.Component{
  handleClick(){
    var content = this.refs.comment.value; //this is available because we did bind(this) on the button render
    $.ajax({
    url: "9/comments",
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

export default class CommentList extends React.Component{

  render() {
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
      <NewComment />
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
    return (
      <div className="commentBox">
        We created a React div component! WOO!
          <CommentList />
      </div>
    );
  }
};
