import React from "react";
import axios from "axios";


class CommentSection extends React.Component {
state = {
  comments: [],
  name: "",
  content: "",
  replyingTo: null,
  replyContent: "",
};

submitReply(parentId) {
  axios
    .post(
      `http://127.0.0.1:8000/api/posts/${this.props.postId}/comments/`,
      {
        name: this.state.name,
        content: this.state.replyContent,
        parent: parentId,
      }
    )
    .then(() => {
      this.setState({
        replyingTo: null,
        replyContent: "",
      });

      this.loadComments();
    })
    .catch((err) => console.log(err));
}


componentDidMount() {
  this.loadComments();
}
loadComments() {
  console.log("Current Post:", this.props.postId);
  axios
    .get(
      `http://127.0.0.1:8000/api/posts/${this.props.postId}/comments/`
    )
    .then((res) => {
  console.log(res.data);

  console.log(res.data);

this.setState({
  comments: res.data.results || res.data,
});
})
    .catch((err) => {
      console.log(err);
    });
}

submitComment() {
  axios
    .post(
      `http://127.0.0.1:8000/api/posts/${this.props.postId}/comments/`,
      {
        name: this.state.name,
        content: this.state.content
      }
    )
    .then((res) => {
    console.log(res.data);

    this.setState({
        name: "",
        content: "",
    });

    this.loadComments();
})
    .catch((err) => {
  console.log(err.response.data);
  console.log(err.response.status);
  alert(JSON.stringify(err.response.data, null, 2));
});
}
render() {
  return (
    <div>
      <h2>Comments</h2>

      {Array.isArray(this.state.comments) && this.state.comments.map((comment) => (
        <div key={comment.id} className="border p-3 mb-3">

          <h4>{comment.name}</h4>

          <p>{comment.content}</p>

          <button
            onClick={() =>
              this.setState({
                replyingTo: comment.id,
              })
            }
          >
            Reply
          </button>

          {this.state.replyingTo === comment.id && (
            <div className="mt-3">
              <textarea
                placeholder="Write a reply..."
                value={this.state.replyContent}
                onChange={(e) =>
                  this.setState({
                    replyContent: e.target.value,
                  })
                }
              />

              <button
                onClick={() => this.submitReply(comment.id)}
              >
                Send Reply
              </button>
            </div>
          )}

          {comment.replies &&
            comment.replies.map((reply) => (
              <div
                key={reply.id}
                className="ml-8 border-l pl-4 mt-3"
              >
                <h4>{reply.name}</h4>

                <p>{reply.content}</p>
              </div>
            ))}
        </div>
      ))}

      {/* Comment Form */}
      <input
        type="text"
        placeholder="Your name"
        value={this.state.name}
        onChange={(e) =>
          this.setState({
            name: e.target.value,
          })
        }
      />

      <textarea
        placeholder="Write a comment..."
        value={this.state.content}
        onChange={(e) =>
          this.setState({
            content: e.target.value,
          })
        }
      />

      <button onClick={() => this.submitComment()}>
        Post Comment
      </button>

    </div>
  );
}
}

export default CommentSection;