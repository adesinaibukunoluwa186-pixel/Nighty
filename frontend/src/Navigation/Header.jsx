
import Navs from "./Navs";

function Header() {
  return (
    <div className="flex bg-blue-900 items-center justify-between" >
      <div className="flex g-[1rem] items-center p-4 gap-[0.5rem] ">
         <div className="font-bold text-[1rem] bg-white text-2xl item-center rounded-full p-[0.5rem] ">BL</div>
         <div className="font-bold text-2xl text-white">Blaze</div>
        </div>
        <Navs />
    </div>
  );
}

export default Header;