import Footer from "../Navigation/Footer";
import Header from "../Navigation/Header";
import React from "react";
import axios from "axios";
import api from "../api/axios"; 
import { useParams } from "react-router-dom";
import Socials from "../Navigation/Socials";
import { Link } from "react-router-dom";
import RelatedPosts from "../components/RelatedPosts";
import CommentSection from "../Navigation/CommentSection";
import { formatDistanceToNow } from "date-fns";



function DetailsWrapper() {
  const params = useParams();
  return <Details params={params} />;
}
class Details extends React.Component{
  state = {
  details: null,
  
};
  componentDidMount() {
  const slug = this.props.params.slug;

  console.log("Route Slug:", slug);

  axios
    .get(`http://127.0.0.1:8000/api/posts/${slug}/`)
    .then((res) => {
      console.log("Post received:", res.data);

      this.setState({
        details: res.data,
      });
    })
    .catch((err) => {
      console.log("ERROR:", err);
      console.log("STATUS:", err.response?.status);
      console.log("DATA:", err.response?.data);
    });
}

componentDidUpdate(prevProps) {
  if (prevProps.params.slug !== this.props.params.slug) {
    axios
      .get(
        `http://127.0.0.1:8000/api/posts/${this.props.params.slug}/`
      )
      .then((res) => {
        this.setState({
          details: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

 bookmarkPost = () => {
  api.post("bookmarks/", {
    post: this.state.details.id,
  })
  .then(() => {
  this.setState({
    bookmarked: true,
  });

  alert("Bookmarked!");
})
  .catch((err) => {
    console.log(err.response?.data);
  });
};



removeBookmark = () => {
  api.delete(
    `bookmarks/${this.state.details.id}/`
  )
  .then(() => {
    this.setState({
      bookmarked: false,
    });

    alert("Bookmark removed");
  });
}; 

render() {
  console.log("Current state:", this.state.details);
  const output = this.state.details;

  return (
    <div>
      <Header />

      {output && (
        <div className="grid m-4">
          <div className="grid bg-gray-200 mb-6">
            {output.image && (
            <img
              src={output.image}
              alt={output.title}
              className="w-full h-[10rem] rounded-xl object-cover"
            /> )}
            <button
  onClick={
    this.state.bookmarked
      ? this.removeBookmark
      : this.bookmarkPost
  }
>
  {this.state.bookmarked ? "★ Saved" : "☆ Save"}
</button> 
            <h2 className="font-bold text-[2rem] leading-none text-black pl-4">
              {output.title}
            </h2>
<div className="flex pl-4 pt-2">
                  <span className="font-bold">Author: {output.author}</span>
                <p> • {formatDistanceToNow(new Date(output.created_at), {
    addSuffix: true,
  })}
</p>
                </div>
            <div
  className="p-4 prose prose-lg max-w-none first-letter:text-6xl first-letter:text-red-700 first-letter:float-left mt-6 leading-8 text-lg whitespace-pre-line"
  dangerouslySetInnerHTML={{
    __html: output.content.replaceAll(
      'src="/media/',
      'src="http://127.0.0.1:8000/media/'
    ),
  }}
/>

            
          </div>
        </div>
      )}

      
      
     {/* {output && (
  <>
    <CommentSection postId={output.id} />
  </> 
)} */}
{output && (
  <>
    <Socials post={output} />
  </>
)}

{output && (
  <>
    <RelatedPosts
      key={output.id}
      category={output.category}
      currentPost={output.id}
    />
  </>
)}

     <Footer />
    </div>
  );
}
}
export default DetailsWrapper;