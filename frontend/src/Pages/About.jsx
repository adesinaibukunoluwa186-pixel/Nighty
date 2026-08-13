import Header from "../Navigation/Header";
import Footer from "../Navigation/Footer";

export default function About(){
  return(
    <>
      <Header />
      <div>
        <div></div>
        
        
        <div class="p-4 bg-gray-200 text-black grid gap-6">
          <span class="text-[2rem] text-black font-bold">Welcome to BLAZE</span>
          <span class=" ">At BLAZE, we believe every brand has a story worth telling. Our mission is to help businesses grow by combining creativity, strategy, and technology to build a strong online presence that delivers real results.
We are a creative digital agency dedicated to helping entrepreneurs, startups, and established businesses stand out in today's competitive market. Whether you're building your brand from scratch or looking to take it to the next level, BLAZE is here to make your vision a reality.</span>
        
        
        <span class="text-[1.2rem] text-black font-bold">Let's Build Something Amazing Together</span>
        <span>Whether you're launching a new business, growing an existing brand, or looking for fresh creative ideas, BLAZE is your trusted digital partner.</span>
        <div class="text-[1rem] text-black font-bold">BLAZE — Igniting Brands. Inspiring Growth.</div>
        </div>
        
        
      </div>
      <Footer />
    </>
  );
}