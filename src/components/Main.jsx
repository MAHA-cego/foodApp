import magnifier from "../assets/iconmonstr-magnifier-lined.svg";

function Main() {
  return (
    <>
      <div className="mx-[40px] mt-[120px]">
        <div className="grid grid-cols-[4fr_1fr_1fr]  items-end pb-[120px] border-b-3">
          <h1 className="text-[18.75rem] col-start-1 translate-x-[-26px] translate-y-[32px] self-end leading-none">
            Food.
          </h1>
          <div className="col-start-2">
            <p className="text-[1.25rem] italic font-light">Sorting :</p>
            <button className="text-[1.25rem]">Alphabetical</button>
          </div>
          <div className="col-start-3 min-w-0">
            <form action="" className="flex flex-col ">
              <label
                htmlFor="search"
                className="text-[1.25rem] italic font-light"
              >
                Search :
              </label>
              <div className="flex flex-row">
                <input
                  type="text"
                  name="search"
                  id="search"
                  autoComplete="off"
                  spellCheck="false"
                  placeholder="..."
                  className="text-[1.25rem] border-none outline-none w-full"
                />
                <button type="submit" className="ml-2">
                  <img src={magnifier} alt="Search" width="18" height="18" />
                </button>
              </div>
            </form>
          </div>
        </div>
        <div></div>
        <div className="mt-[120px] grid grid-cols-[7fr_3fr_2fr]">
          <div className="col-start-2 flex flex-col gap-[36px]">
            <h2 className="text-[3rem] font-medium leading-14">
              Did not find <br /> what you needed?
            </h2>
            <p className="text-[1.5rem] text-darkGrey leading-8">
              Recipes are being added every day by our users, be sure to drop by
              later.{" "}
            </p>
            <h3 className="text-[2rem] underline mt-[4px]">Add your own !</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
