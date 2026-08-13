import Newsletter from "../Navigation/Newsletter"
import {FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaTiktok} from "react-icons/fa";
function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="bg-blue-900 ">
    <div className="p-6 flex flex-col md:flex-row justify-between">
      
      
      <div className="grid md:p-0">
        
        <div className="flex items-center  gap-[0.5rem]">
         <div className="font-bold text-[1rem] bg-white text-2xl item-center rounded-full p-[0.5rem] ">BL</div>
         <div className="font-bold text-2xl text-white">Blaze</div>
        </div>
        
      
        <span className="text-gray-200 ">ingnite the fire in you to make to <br />professional in every aspect.</span>
        
        <div className="flex text-blue-500 font-bold text-[1.5rem] gap-3">
            <a href={`https://www.facebook.com/sharer/sharer.php?u=`}  target="_blank"  rel="noopener noreferrer"> 
              <FaFacebook />
            </a>
            <a>
              <FaInstagram />
            </a>
            <a>
              <FaTwitter />
            </a>
            <a>
              <FaYoutube />
            </a>
            <a>
              <FaTiktok />
            </a>
          </div>
      </div>
      
      <div className="grid pt-4">
        <div className="grid">
          <span className="text-white font-[600] text-2xl">Navigate</span>
          <span className="w-[2rem] h-[0.12rem] bg-gray-200 rounded-full"></span>
        </div>
        <div className="pl-[1rem] grid text-white">
          <a>Home</a>
          <a>About Us</a>
          <a>Contact Us</a>
          <a>Latest</a>
        </div>
      </div>
      
      <div className="grid pt-4">
        <div className="grid">
          <span className="text-white font-[600] text-2xl">Categorise</span>
          <span className="w-[2rem] h-[0.12rem] bg-gray-200 rounded-full"></span>
        </div>
        <div className="pl-[1rem] grid text-white">
          <a>Hot/Latest</a>
          <a>Business Us</a>
          <a>Marketing Us</a>
          <a>Tech/Tutorial</a>
        </div>
      </div>
      
      <Newsletter />
      
      </div>
      
      <div className="text-gray-200 flex justify-center items-center pb-2 text-[1.2rem]">©{currentYear} Blaze. All Right Reserved</div>
    </div>
  );
}

export default Footer;