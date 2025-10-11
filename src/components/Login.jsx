import visible from "../assets/iconmonstr-eye-lined.svg";
import hidden from "../assets/iconmonstr-eye-off-lined.svg";

function Login() {
  return (
    <>
      <div className="mt-52 w-150 mx-auto">
        <div className="flex flex-row justify-between pb-10 border-b">
          <h1 className="text-4xl underline hover:cursor-pointer">Log in</h1>
          <h1 className="text-4xl hover:cursor-pointer">Sign up</h1>
        </div>
        <form
          action=""
          className="col-start-2 col-span-2 flex flex-col pt-22 gap-16"
        >
          <input type="text" placeholder="Username" className="text-xl noBox" />
          <div className="flex flex-row justify-between">
            <input
              type="password"
              placeholder="Password"
              className="text-xl noBox"
            />
            <button>
              <img
                src={visible}
                alt=""
                className="h-6 w-6 hover:cursor-pointer"
              />
            </button>
          </div>
          <input
            type="submit"
            value="Continue"
            className="text-right text-3xl font-medium pt-3 hover:cursor-pointer"
          />
        </form>
        <div className="col-start-4"></div>
      </div>
    </>
  );
}

export default Login;
