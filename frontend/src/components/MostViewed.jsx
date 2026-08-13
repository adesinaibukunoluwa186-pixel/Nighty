import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

class MostViewed extends React.Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/posts/most-viewed/")
      .then((res) => {
        this.setState({
          posts: res.data.results || res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <section className="m-4">

        <h2 className="text-2xl uppercase font-bold mb-4">
          HoT/Trends
        </h2>

        <div className="flex overflow-y-auto gap-4">

          {this.state.posts.map((post) => (

            <Link
              key={post.id}
              to={`/post/${post.slug}`}
              className="block"
            >

              <div className="bg-gray-200 flex w-[22rem] h-[8rem] rounded-lg overflow-hidden">

                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-[10rem] h-48 object-cover"
                  />
                )}

                <div className="p-4 ">

                  <p className="text-sm text-gray-500">
                    {post.category}
                  </p>

                  <h3 className="font-bold text-lg mt-1 line-clamp-2 leading-tight mt-2">
                    {post.title}
                  </h3>

                  <div className="flex gap-2 text-[0.8rem] mt-3">
                  
                
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

      </section>
    );
  }
}

export default MostViewed;