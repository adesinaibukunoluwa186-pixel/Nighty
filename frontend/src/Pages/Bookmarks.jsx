import React from "react";
import api from "../api/axios";

class Bookmarks extends React.Component {
  state = {
    bookmarks: [],
  };

  componentDidMount() {
    api.get("bookmarks/")
      .then((res) => {
        this.setState({
          bookmarks: res.data,
        });
      });
  }

  render() {
    return (
      <div>
        <h2>My Bookmarks</h2>

        {bookmarks.map(bookmark => (
<div key={bookmark.id}>

<img
src={bookmark.post.image}
alt=""
width="250"
/>

<h2>{bookmark.post.title}</h2>

<p>{bookmark.post.author}</p>

</div>
))}
      </div>
    );
  }
}

export default Bookmarks;