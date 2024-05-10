import React, { useState } from 'react'
import HeaderContactLayout from '../HeaderContactLayout'
import { useSession } from '@providers/AuthProvider'
import ModalTransparent from '@components/core/ModalTransparent';
import StatusPhoto from './child/StatusPhoto';
import StatusText from './child/StatusText';

export type StatusRouterType = "idle" | "text" | "photo";

function StatusContentContact() {

    const { user } = useSession();
    const [statusRouter, setStatusRouter] = useState<StatusRouterType>("idle");

    function handleRouter(name: StatusRouterType) {
        setStatusRouter(name);
    }

    return (
        statusRouter === "text" ?
            <StatusText 
            back={handleRouter}
            /> :
            statusRouter === "photo" ?
                <StatusPhoto /> : (
                    <div className='fixed min-h-screen w-[31%] left-0 top-0 bg-bg-secondary'>
                        <HeaderContactLayout
                            label='Status'
                        />

                        <div className='py-6 px-4 flex flex-col text-white'>
                            <ModalTransparent
                                button={() => (
                                    <div className='flex gap-3 pb-10'>
                                        <span className='w-[45px] aspect-square rounded-full bg-gray-400 flex justify-center items-center'>
                                            {user.username?.charAt(0).toUpperCase()}
                                        </span>
                                        <div className='flex flex-col items-start'>
                                            <h3>My Status</h3>
                                            <p className='text-[.8rem] text-icon-color'>Click to add update status</p>
                                        </div>
                                    </div>
                                )}
                            >
                                {(handleTgl) => (
                                    <div className='absolute flex flex-col -bottom-full w-[180px] p-4 items-start gap-4 bg-bg-primary'>
                                        <button
                                            onClick={() => {
                                                handleRouter("photo");
                                                handleTgl()
                                            }}
                                        >Photos & videos
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleRouter("text");
                                                handleTgl()
                                            }}
                                        >
                                            Text
                                        </button>
                                    </div>
                                )}
                            </ModalTransparent>
                            <div className='pb-10'>
                                <h3 className='text-green-primary pl-4'>RECENT</h3>
                                <div className='flex flex-col gap-3'>

                                </div>
                            </div>
                            <div>
                                <h3 className='text-green-primary pl-4'>VIEWED</h3>
                                <div className='flex flex-col gap-3'>

                                </div>
                            </div>
                        </div>
                    </div>
                )
    )
}

export default StatusContentContact
