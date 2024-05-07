
function ClipMenu() {
  return (
    <div
      className="absolute w-[180px] left-0 bottom-[150%] rounded-lg flex flex-col gap-3 bg-hover-color p-3 items-start text-white"
    >
      <button>Document</button>
      <button>Photo</button>
      <button>Contact</button>
    </div>
  )
}

export default ClipMenu
