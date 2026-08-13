import axios from "axios";
import React from "react";
import Home from "../assets/Home.jpg"

class CategorySlider extends React.Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/categories/")
      .then((res) => {
        this.setState({
          categories: res.data.results,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

render(){
  return(
    <>
      
      
      
      <div>
        
        
    
 
        <div className="relative">
          
          
          <span>
            <img 
            src={Home}
            className="w-full object-cover h-[400px]"/>
          </span>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <span className="text-5xl font-bold text-white">Home</span>
            <div>
              <span className="text-white text-lg max-w-xl mt-2">
                To empower businesses with creative and effective digital solutions that inspire trust, strengthen brands, and accelerate growth.
              </span>
            </div>
          </div>
        </div>

      </div>
      
      <div className="bg-gray-200">
      <span className="font-bold text-black mt-8 p-6 text-[2rem]">Categories</span>
      <div className="flex overflow-x-auto gap-3 px-4 py-3 whitespace-nowrap">
        <span 
        onClick={() => {
  this.props.onCategorySelect("");}}
        className="px-5 py-2 bg-gray-300 rounded-xl font-medium shrink-0">Home</span>
        {this.state.categories.map((category) => (
  <button
    key={category.id}
    onClick={() => this.props.onCategorySelect(category.name)}
    className="px-5 py-2 bg-gray-300 rounded-xl font-medium shrink-0"
  >
    {category.name}
  </button>
))}
  
      </div>
      </div>
    </>
  );
}
}
export default CategorySlider;