import { useState } from "react";
import Footer from "../Navigation/Footer";
import Header from "../Navigation/Header";
import BlogPost from "../components/BlogPost";
import MostViewed from "../components/MostViewed";
import CategorySlider from "../components/CategorySlider";


{/* import BlogSection from "../components/BlogSection"; 
import Display from "../components/Display";
import HeaderDisplay from "../components/HeaderDisplay";
import HeadDisplay from "../components/HeadDisplay";
*/}


export default function Home() {
 const [selectedCategory, setSelectedCategory] = useState(""); 
  
  
  return (
    <>
      <Header />
      <CategorySlider  onCategorySelect={setSelectedCategory} />
      <MostViewed />
      <BlogPost category={selectedCategory}/>
      

  
      <Footer />
    </>
  );
}
