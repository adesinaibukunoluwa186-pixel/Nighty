import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";


class RelatedPosts extends React.Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    axios
      .get(
        `http://127.0.0.1:8000/api/posts/?category=${this.props.category}`
      )
      .then((res) => {
  console.log(res.data);

  this.setState({
    posts: res.data.results,
  });
})
      .catch((err) => console.log(err));
  }

componentDidUpdate(prevProps) {
  if (prevProps.category !== this.props.category) {
    axios
      .get(
        `http://127.0.0.1:8000/api/posts/?category=${this.props.category}`
      )
      .then((res) => {
        this.setState({
          posts: res.data.results,
        });
      })
      .catch((err) => console.log(err));
  }
}

  render() {
    console.log(this.props.category);
    return (
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 pl-4">
          Related Posts
        </h2>

        {this.state.posts
          .filter(post => post.id !== this.props.currentPost)
          .map(post => (
            <Link key={post.id} to={`/post/${post.slug}`}
            onClick={() => console.log("Clicked", post.id)}>
              <div className=" p-3 mb-3 rounded items-center flex gap-4 mr-4 bg-gray-200 rounded-xl ml-2">
                {post.image && (
                <img 
                src={post.image}
                alt={post.title}
                className="w-[5rem] h-[5rem] object-cover  " />
                )}
                
                <div>
                  <div className="gap-2">
                <h3 className="font-bold text-[1.1rem]">
                  {post.title}
                </h3>

                <p className="line-clamp-2 text-[0.85rem] leading-tight">
                  {post.content}
                </p>
                </div>
                
                <div className="flex gap-4 text-[0.8rem]">
                  
                
                  <span className=" ">Author: {post.author}</span>
                  <p> • {formatDistanceToNow(new Date(post.created_at), {
    addSuffix: true,
  })}
</p>
                
                </div>
                </div>
              </div>
              
            </Link>
          ))}
      </div>
    );
  }
}

export default RelatedPosts;