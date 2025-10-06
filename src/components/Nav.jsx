import brightnessIcon from "../assets/iconmonstr-brightness-10.svg";

function Nav() {
  return (
    <nav className="grid grid-cols-[2fr_1fr] px-[2.5rem] pt-[1.875rem]  fixed w-full top-0 z-100 ">
      <h2 className="grid-start-1 text-[2rem] font-medium -translate-0.5">
        Food.
      </h2>
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
            <img src={brightnessIcon} alt="" className="w-[1.5rem]" />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
