import React, { Dispatch, SetStateAction } from 'react'
import PrfofleInputField from '../../profileContent/PrfofleInputField'
import HeaderContactLayout from '../../HeaderContactLayout'
import Icon from '../../../../../../../constants/icons'

function DetailGroup({ back, detailGroup, setDetailGroup }: { back: Dispatch<SetStateAction<boolean>>, detailGroup: any, setDetailGroup: any }) {
    return (
        <div className='fixed min-h-screen w-[31%] left-0 top-0 bg-bg-secondary'>
            <HeaderContactLayout
                label='New Group'
                back={() => back(pv => !pv)}
            />
            <div className='flex flex-col px-10 text-white'>

                {/* Profile Photo start */}
                <div className='w-full flex justify-center py-12 pb-16'>
                    <span
                        className='text-3xl text-white w-[200px] flex justify-center items-center aspect-square rounded-full bg-gray-500'
                    >
                        p
                    </span>
                </div>
                {/* Profile Photo end */}

                <div className='flex flex-col gap-3'>
                    <input
                    placeholder='Group subject (optional)'
                        type="text"
                        className={`bg-transparent py-2 w-full outline-none text-base text-white border-b-2 border-hover-color focus:border-green-accent`}
                    // onChange={(e) => setString(e.target.value)}
                    />
                </div>

                <div className='w-full flex justify-center pb-4 bg-bg-secondary py-5 pt-32'>
                    <button

                        className='bg-green-accent p-1 rounded-full'
                    >
                        {Icon.check({
                            size: 35,
                            color: "#fff"
                        })}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DetailGroup
