import { useEffect, useState } from "react";
import { StatusFile } from "../StatusContentContact";
import LockIcon from "@components/LockIcon";
import Icon from "../../../../../../../constants/icons";
import { colors } from "../../../../../../../constants/color";

function StatusPhoto({
  files,
  handleAddStatus,
  handleCreateStatus,
  handleDeleteStatus,
  handleEditStatus,
  progress
}: {
  files: StatusFile[],
  handleAddStatus: (name: FileList) => void,
  handleCreateStatus: () => void,
  handleDeleteStatus: (url: string) => void,
  handleEditStatus: (text: string, index: number) => void;
  progress: number;
}) {

  const [index, setIndex] = useState(0)
  const [text, setText] = useState("");

  function handleDelete(url: string) {
    setIndex(index - 1)
    handleDeleteStatus(url)
  }

  useEffect(() => {
    handleEditStatus(text, index);
  }, [text])


  useEffect(() => {
    if (files[index] && files[index].text) {
      setText(files[index].text!)
    } else {
      setText("")
    }
  }, [index])

  return (
    <div className='min-h-screen w-full flex justify-center top-0 left-0 fixed bg-bg-secondary z-[999]'>
      <div className="flex flex-col w-full items-center py-6">
        <div className="pt-12">
          <div className="p-6 text-white absolute left-6 top-6">
            <button>
              {Icon.times({
                size: 35,
                color: colors.ICON_COLOR
              })}
            </button>
          </div>
          {
            progress !== 100 && progress ? (
              <div className="w-[450px] h-[60vh] text-3xl text-white flex justify-center items-center">
                <h3>Compressing.. </h3>
                <p>{progress}</p>
              </div>
            ) : (
              <img className="object-contain rounded w-[450px] h-[60vh]" src={files[index]?.url!} alt="" />
            )
          }
        </div>
        <div className="my-6 text-white">
          <input type="text" className="w-[500px] bg-bg-primary rounded-sm p-1" value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div className="w-full flex items-center justify-between text-white border-t p-6">
          <button className="py-1 px-8 rounded-full bg-green-accent">Contact</button>
          <div className="flex gap-2">
            {
              files.map((foo, i) => (
                <div className={`relative ${index === i && "outline outline-2 outline-green-accent rounded"}`} key={foo.url} >
                  {
                    i > 0 &&
                    <button className="absolute right-0 top-0 m-.5"
                      onClick={() => handleDelete(foo.url)}
                    >
                      {
                        Icon.times({
                          size: 25,
                          color: colors.ICON_COLOR
                        })
                      }
                    </button>
                  }
                  <img
                    src={foo?.url!}
                    onClick={(e) => {
                      e.stopPropagation()
                      setIndex(i)
                    }} 
                    className="w-[50px] h-[50px] object-cover" alt=""
                     />
                </div>
              ))
            }
            <div className="w-[50px] h-[50px] cursor-pointer border-2 border-icon-color rounded relative flex justify-center items-center text-3xl text-white">
              <span className="mb-1 text-icon-color">+</span>
              <input
                className="opacity-0 absolute cursor-pointer top-0 left-0 right-0 bottom-0"
                type="file"
                onChange={(e) => {
                  if (e.target.files?.length) {
                    setIndex(files.length)
                    handleAddStatus(e.target.files)
                    setText("")
                  }
                }}

              />
            </div>
          </div>
          <button onClick={handleCreateStatus} className="p-2 rounded-full bg-green-accent">
            {
              Icon.arrow_right({
                size: 35,
                color: "#fff"
              })
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default StatusPhoto
