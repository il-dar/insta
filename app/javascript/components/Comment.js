import React from 'react';

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
// export default class CommentBox extends React.Component{
//   render() {
//     return (
//       <div className="commentBox">
//         We created a React div component! WOO!
//           <CommentList />
//           <CommentForm />
//       </div>
//     );
//   }
// };
