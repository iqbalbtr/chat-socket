import { useContact } from '@contexts/chat/ContactContext';
import { StatusUser, useStatusContact } from '@contexts/chat/contact/StatusContactContext'
import { getTimeNotif } from '@utils/timeNotif';
import React, { useEffect, useState } from 'react'
import Icon from '../../../../../../../constants/icons';
import { colors } from '../../../../../../../constants/color';
import { Slide, StatusRouterType } from '../StatusContentContact';
import { useSession } from '@providers/AuthProvider';


function StatusView({
    slide,
    handleRoute,
    next,
    prev
}: {
    slide: Slide,
    handleRoute: (route: StatusRouterType) => void;
    next: () => void;
    prev: () => void;
}) {
    const { status } = useStatusContact();
    const { user } = useSession();
    const { contact } = useContact();

    const statusActive = status.filter(foo => foo.username !== user.username && foo.data.length);

    const currentStatus = slide.user ? status.find(foo => foo.username === user.username) : statusActive[slide.indexStatus];
    const currentStatusName = slide.user ? "Kamu" : contact.find(foo => foo.username === currentStatus?.username)?.name;


    const [tgl, setTgl] = useState({
        left: false,
        right: false
    })

    useEffect(() => {
        const nextStatus = setTimeout(() => next(), 5000);

        if (slide.index <= 0 && slide.indexStatus <= 0) {
            setTgl(pv => ({ ...pv, left: true }))
        } else {
            setTgl(pv => ({ ...pv, left: false }))
        }

        if (slide.index === statusActive[slide.indexStatus].data.length - 1 && slide.indexStatus === statusActive.length - 1) {
            setTgl(pv => ({ ...pv, right: true }))
        } else {
            setTgl(pv => ({ ...pv, right: false }))
        }

        return () => {
            clearTimeout(nextStatus)
        }
    }, [slide])


    console.log(currentStatus);
    


    return (
        <div className='w-full fixed left-0 top-0 flex min-h-screen bg-bg-secondary justify-between px-16 items-center z-50 text-white'>
            {
                !tgl.left &&
                <button onClick={prev}>
                </button>
            }
            <button onClick={() => handleRoute("idle")} className='absolute top-0 left-0 p-6'>
                {Icon.times({
                    size: 35,
                    color: colors.ICON_COLOR
                })}
            </button>
            <div className='flex flex-col gap w-full items-center relative'>
                <div className='relative'>
                    <div className='absolute flex flex-col p-1 justify-start gap-4 w-[450px] my-4 top-0 left-1/2 -translate-x-1/2'>
                        <div className='flex gap-1'>
                            {
                                [...Array(currentStatus?.data?.length)].map((_, i) => (
                                    <div key={i} className={`h-2 rounded-full w-full relative bg-icon-color`}>
                                        {
                                            i < slide.index ? (
                                                <div className={`bg-white h-2 rounded-md absolute w-full `}></div>
                                            ) : i === slide.index ? (
                                                <div
                                                    style={{
                                                        animation: "progressStatus 5s linear infinite"
                                                    }}
                                                    className={`z-10 bg-white h-2 rounded-md absolute`}
                                                ></div>
                                            ) : (
                                                <div className={`bg-icon-color h-2 rounded-md absolute w-full `}></div>
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                        <div className='flex gap-4 w-full backdrop-blur-[2px]'>
                            <span className='w-[50px] flex justify-center items-center h-[50px] rounded-full bg-gray-500'>A</span>
                            <div className='flex relative z-30 flex-col'>
                                <h3 className='text-xl  font-thin'>{currentStatusName}</h3>
                                <p className='text-sm text-icon-color'>Hari ini {getTimeNotif(new Date(currentStatus?.data[slide.index].create_at!))}</p>
                            </div>
                        </div>
                    </div>
                    <img src={currentStatus?.data[slide.index].src! || ""} className='h-screen w-auto' alt="" />
                    <div className='absolute bottom-0 w-full py-6 bg-black/50 pb-24 px-6 text-center'>
                        <p className='line-clamp-4'>{currentStatus?.data[slide.index].text!}</p>
                    </div>
                </div>
                <div className='absolute bottom-0 py-6 w-full flex justify-center'>
                    <input type="text" className='p-2 bg-bg-primary rounded-md w-1/2' />
                </div>
            </div>
            {
                !tgl.right &&
                <button onClick={next}>
                    {Icon.arrow_right({
                        size: 35,
                        color: colors.ICON_COLOR
                    })}
                </button>
            }
        </div>
    )
}

export default StatusView
