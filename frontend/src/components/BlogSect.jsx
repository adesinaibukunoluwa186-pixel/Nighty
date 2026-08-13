import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

class BlogSect extends React.Component {
  
  
  
  
state = {
  details: [],
  comments: {},
  commentForms: {},
};
handleChange = (e, postId) => {
  const { name, value } = e.target;

  this.setState((prevState) => ({
    commentForms: {
      ...prevState.commentForms,
      [postId]: {
        ...prevState.commentForms[postId],
        [name]: value,
      },
    },
  }));
};



handleComment = async (e, postId) => {
  e.preventDefault();
  alert("handleComment is working");
  try {
    const form = this.state.commentForms[postId] || {};

    await axios.post(
      `http://127.0.0.1:8000/api/posts/${postId}/comments/`,
      {
        name: form.name,
        email: form.email,
        content: form.content,
      }
    );

    const res = await axios.get(
      `http://127.0.0.1:8000/api/posts/${postId}/comments/`
    );

    this.setState((prevState) => ({
      comments: {
        ...prevState.comments,
        [postId]: res.data,
      },
      commentForms: {
        ...prevState.commentForms,
        [postId]: {
          name: "",
          email: "",
          content: "",
        },
      },
    }));
  } catch (err) {
    console.log(err);
  }
};

loadComments = async (postId) => {
  const res = await axios.get(
    `http://127.0.0.1:8000/api/posts/${postId}/comments/`
  );

  this.setState((prevState) => ({
    comments: {
      ...prevState.comments,
      [postId]: res.data,
    },
  }));
};






  componentDidMount() {
  axios
    .get("http://127.0.0.1:8000/")
    .then((res) => {
      this.setState({
        details: res.data,
      });

      res.data.forEach((post) => {
        this.loadComments(post.id);
      });
    })
    .catch((err) => {
      console.log(err.response?.status);
      console.log(err.response?.data);
      console.log(err.message);
    });
}   // <-- You were missing this closing brace

handleLike = async (id) => {
  await axios.post(`http://127.0.0.1:8000/api/posts/${id}/like/`);
};

render() {
  return (
  <div>
    <header>Data Generated from Django</header>
    <hr />

    {this.state.details.map((output) => (
      <div key={output.id}>
        <h2>{output.title}</h2>
        <p>{output.content}</p>

        {output.image && (
          <img
            src={output.image}
            alt={output.title}
            width="200"
          />
        )}

        <p>Category: {output.category}</p>
        <p>{output.views} views</p>
        <p>{new Date(output.created_at).toLocaleDateString()}</p>

        <button onClick={() => this.handleLike(output.id)}>
          ❤️ {output.likes}
        </button>

        <hr />

        <form onSubmit={(e) => this.handleComment(e, output.id)}>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={this.state.commentForms[output.id]?.name || ""}
            onChange={(e) => this.handleChange(e, output.id)}
          />

          <br /><br />

          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={this.state.commentForms[output.id]?.email || ""}
            onChange={(e) => this.handleChange(e, output.id)}
          />

          <br /><br />

          <textarea
            name="content"
            placeholder="Write a comment..."
            value={this.state.commentForms[output.id]?.content || ""}
            onChange={(e) => this.handleChange(e, output.id)}
          />

          <br /><br />

          <button
  type="submit"
  onClick={() => console.log("Button clicked")}
>
  Post Comment
</button>



        </form>

        {(this.state.comments[output.id] || []).map((comment) => (
          <div key={comment.id}>
            <hr />
            <strong>{comment.name}</strong>
            <p>{comment.content}</p>
          </div>
        ))}

        <hr />
      </div>
    ))}
  </div>
  );
 }
}
export default BlogSect;