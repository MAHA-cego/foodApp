function LogoutConfirmation({ onConfirm, onCancel }) {
  return (
    <>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-10 z-[200] h-[50%] w-[50%] bg-white border-2">
        <p>You are about to log out, are you sure?</p>
        <div className="flex flex-row gap-15 text-lg">
          <button
            className="text-darkGrey hover:cursor-pointer"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button className="hover:cursor-pointer" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </>
  );
}

export default LogoutConfirmation;
