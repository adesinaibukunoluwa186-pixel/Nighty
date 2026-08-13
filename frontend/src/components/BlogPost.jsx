import Footer from "../Navigation/Footer";
import Header from "../Navigation/Header";
import React from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";



class BlogPost extends React.Component {
  state = {
  details: [],
  next: null,
  previous: null,
};

  loadPosts() {
  let url = "http://127.0.0.1:8000/api/posts/";

  if (this.props.category) {
    url = `http://127.0.0.1:8000/api/posts/?category=${this.props.category}`;
  }

  axios
    .get(url)
    .then((res) => {
      console.log(res.data);

      this.setState({
        details: res.data.results,
        next: res.data.next,
        previous: res.data.previous,
      });
    })
    .catch((err) => {
      console.log(err);
    });
}


loadPage(url) {
  axios
    .get(url)
    .then((res) => {
      this.setState({
        details: res.data.results,
        next: res.data.next,
        previous: res.data.previous,
      });
    })
    .catch((err) => {
      console.log(err);
    });
}


  componentDidMount() {
    this.loadPosts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.loadPosts();
    }
  }

render() {
  return (
    <div>
      <h2 className="text-[2rem] font-bold px-6 pt-4">OUR POST</h2>

      <div className="grid m-4">
        {this.state.details.map((output) => {
          console.log(output.image);

          return (
            <Link key={output.id} to={`/post/${output.slug}`}>
              <div className="grid bg-gray-200 mb-6">
                {output.image && (
                  <img
  src={output.image}
  alt={output.title}
  className="w-full h-[10rem] object-cover"
/>
                )}

                <div className="m-4 gap-4">
                  <div className="flex justify-between">
                    <span>{output.category}</span>
                    <FaEye />
                  </div>

                  <h2 className="text-[1.3rem] font-bold">{output.title}</h2>
                  <p className="line-clamp-2">{output.content}</p>
                  
                  <div className="flex gap-4">
                  <span className="font-bold">Author: {output.author}</span>
                <p> • {formatDistanceToNow(new Date(output.created_at), {
    addSuffix: true,
  })}
</p>
                </div>
                </div>
                
                
                
              </div>
            </Link>
          );
        })}
      </div>
      
      <div className="flex justify-center gap-4 my-6">
  <button
    disabled={!this.state.previous}
    onClick={() => this.loadPage(this.state.previous)}
    className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
  >
    Previous
  </button>

  <button
    disabled={!this.state.next}
    onClick={() => this.loadPage(this.state.next)}
    className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
  >
    Next
  </button>
</div>
    </div>
  );
}
}
export default BlogPost;