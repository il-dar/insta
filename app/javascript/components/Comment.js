import React from 'react';

export default class Comment extends React.Component{
  render() {
    const node = document.getElementById('comments_data1')
    const data = JSON.parse(node.getAttribute('data'))
    console.log(data)
    return (
      <div>
        <h1 className = "comment"> {data.content} </h1>
        <h1>{node.getAttribute('name')}</h1>
      </div>
    )
  }
};

// class CommentList extends React.Component{
//   render() {
//     var commentData = this.props.data.map(function(comment, index){
//       return (
//         <Comment id={comment.user_id} />
//       );
//     });
//     return (
//       <div className="commentList">
//         {commentData}
//         Yeahhhh I am a CommentList.
//       </div>
//     );
//   }
// };
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
