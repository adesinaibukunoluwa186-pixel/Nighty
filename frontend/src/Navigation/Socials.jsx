import { FaFacebook, FaLinkedin, FaTelegram, FaRegCopy} from "react-icons/fa";
import { FaXTwitter, FaWhatsapp } from 'react-icons/fa6';
export default function Socials({ post }) {
  if (!post) return null;

  const postUrl = `http://127.0.0.1:5173/post/${post.id}`;
  const postTitle = post.title;



const copyLink = () => {  navigator.clipboard.writeText(postUrl);  alert("Link copied!");};
  return(
    <>
      <div className="gap-6 p-4">
        <span className="text-[2rem]">share post</span>
        <ul className="flex gap-2 justify-center items-center ">
          <li className="bg-gray-200 text-blue-500 text-[2rem] p-1 rounded-xl bold"> <a href={`https://wa.me/?text=${encodeURIComponent(postTitle + " " + postUrl)}`}  target="_blank"  rel="noopener noreferrer"> <FaWhatsapp /> </a>
          </li>
          
          <li className="bg-blue-500 text-gray-200 text-[2rem] p-1 rounded-xl bold">  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}  target="_blank"  rel="noopener noreferrer">  <FaFacebook /> </a>
          </li>
          
           <li className="bg-gray-200 text-blue-500 text-[2rem] p-1 rounded-xl bold">   <a  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(postUrl)}`}
  target="_blank"
  rel="noopener noreferrer"> <FaXTwitter /> </a>    </li>
        
          <li className="bg-blue-500 text-gray-200 text-[2rem] p-1 rounded-xl bold">    <a  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}  target="_blank"  rel="noopener noreferrer">  <FaLinkedin /> </a>       </li>
          
          <li className="bg-gray-200 text-blue-500 text-[2rem] p-1 rounded-xl bold">  <a  href={`https://t.me/share/url?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postTitle)}`}  target="_blank"  rel="noopener noreferrer">  <FaTelegram /> </a>          </li>
          
          <li className="text-xl flex justify-center items-center bg-blue-500 text-gray-200 text-[2rem] rounded-xl p-1 bold">
            

<button onClick={copyLink}>  <FaRegCopy /> </button>    </li>
        </ul>
      </div>
      
    </>
  );
}