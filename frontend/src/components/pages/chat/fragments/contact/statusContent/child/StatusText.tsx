import Icon from '../../../../../../../constants/icons'
import { StatusRouterType } from '../StatusContentContact'

function StatusText({back, send}:{back: (name: StatusRouterType) => void, send?: () => Promise<void>}) {
    return (
        <div className='min-h-screen w-full top-0 left-0 fixed bg-amber-600 z-[999]'>
            <div className='p-8 flex justify-between w-full'>
                <button
                onClick={() => back("idle")}
                >
                    {Icon.times({
                        size: 35,
                        color: "#fff"
                    })}
                </button>
                <div>
                    <button>
                        {Icon.pallete({
                            size: 35,
                            color: "#fff"
                        })}
                    </button>
                </div>
            </div>

            <div className='w-full px-6 h-[70vh] text-white flex justify-center items-center'>
                <textarea
                    name=""
                    id=""
                    className='w-full h-fit placeholder-icon-color bg-transparent outline-none text-6xl text-center'
                    placeholder='Type a status'
                >

                </textarea>
            </div>

            <div className='py-8 px-10 bg-black/50 flex justify-end items-center'>
                <button className='p-1 rounded-full bg-green-accent'>
                    {Icon.arrow_right({
                        size: 45,
                        color: "#fff"
                    })}
                </button>
            </div>
        </div>
    )
}

export default StatusText
