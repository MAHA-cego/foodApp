import brightnessIcon from "../assets/iconmonstr-brightness-10.svg";

function Nav() {
  return (
    <nav className="grid grid-cols-[2fr_1fr] mx-[40px] mt-[30px]  ">
      <h2 className="grid-start-1 text-[2rem] font-medium">Food.</h2>
      <div className="grid-start-2">
        <ul className="flex flex-row justify-between text-[1.25rem]">
          <li className="">
            <a href="">Upload</a>
          </li>
          <li>
            <a href="">Discover</a>
          </li>
          <li>
            <a href="" className="">
              Cook
            </a>
          </li>
          <li>
            <img src={brightnessIcon} alt="" className="w-[24px]" />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
