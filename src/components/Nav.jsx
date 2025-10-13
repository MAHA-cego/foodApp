import brightnessIcon from "../assets/iconmonstr-brightness-10.svg";

function Nav() {
  return (
    <nav className="grid grid-cols-[2fr_1fr] px-10 pt-[1.875rem]  fixed w-full top-0 z-100 ">
      <h2 className="grid-start-1 text-3xl font-medium -translate-0.5 hover:cursor-pointer">
        Food.
      </h2>
      <div className="grid-start-2">
        <ul className="flex flex-row justify-between text-lg">
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
            <img
              src={brightnessIcon}
              alt=""
              className="w-5 hover:cursor-pointer"
            />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
