import arrow from "../assets/iconmonstr-arrow-right-lined.svg";
import eggFriedRiceImg from "../assets/egg-fried-rice-main-preview.webp";

function RecipeMain() {
  return (
    <>
      <div className="grid grid-cols-[2fr_3fr_6fr_1fr] h-[6.25rem] border-b text-[1.5rem]">
        <p className="col-start-1 inline-block content-center text-darkGrey">
          21.09.2025
        </p>
        <button className="col-start-2 justify-self-start border h-[2.3rem] w-[6rem] rounded-lg self-center hover:cursor-pointer">
          Cédric
        </button>
        <h3 className="col-start-3 inline-block content-center font-medium hover:cursor-pointer">
          Stir fried rice
        </h3>
        <button className="col-start-4 justify-self-end hover:cursor-pointer">
          <img src={arrow} alt="Search" width="40" height="40" />
        </button>
        <div className="grid grid-cols-[4fr_1fr_1fr] absolute">
          <img
            src={eggFriedRiceImg}
            alt=""
            className="h-[287px] w-[287px] col-start-2 translate-y-[-35%]"
          />
        </div>
      </div>
    </>
  );
}

export default RecipeMain;
