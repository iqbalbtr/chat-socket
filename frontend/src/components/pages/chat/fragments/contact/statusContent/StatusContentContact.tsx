import React, { useEffect, useState } from 'react'
import HeaderContactLayout from '../HeaderContactLayout'
import { useSession } from '@providers/AuthProvider'
import ModalTransparent from '@components/core/ModalTransparent';
import StatusPhoto from './child/StatusPhoto';
import StatusText from './child/StatusText';
import ContactContentLayout from '../ContactContentLayout';
import { StatusUser, useStatusContact } from '@contexts/chat/contact/StatusContactContext';
import StatusCard from './components/StatusCard';
import StatusView from './child/StatusView';
import { useSocket } from '@providers/SocketProvider';
import usePhotoCompress from '@hooks/usePhotoCompress';

export type StatusRouterType = "idle" | "text" | "photo" | "view";
export type StatusFile = {
    url: string,
    file: File,
    text?: string
};

export interface Slide {
    index: number;
    indexStatus: number;
    max: boolean;
    min: boolean;
    user: boolean;
}

function StatusContentContact() {

    const { user } = useSession();
    const { socket } = useSocket();
    const { handleCompress, progress, result, handleReset } = usePhotoCompress();
    const { status, fn: { handleStoreUser, hanldeReadStatus } } = useStatusContact();
    const [statusRouter, setStatusRouter] = useState<StatusRouterType>("idle");
    const [slide, setSlide] = useState<Slide>({
        indexStatus: 0,
        index: 0,
        max: false,
        user: false,
        min: false
    });
    // const [currentStatus, setCurrentStatus] = useState<>(null)
    const [newStatus, setNewStatus] = useState<StatusFile[]>([]);


    // Memastikan currentStatus dan currentStatusData sudah didefinisikan dengan benar
    const currentStatus = status[slide.indexStatus];
    const currentStatusData = currentStatus?.data[slide.index];

    // Mencari status pengguna dan status yang aktif
    const userStatus = status.find(foo => foo.username === user.username);
    const statusActive = status.filter(foo => foo.username !== user.username && foo.data.length);

    // Filter status recent dan viewed
    const recent = statusActive.filter(foo => foo.data.some(fii => fii.status_read.length === 0));
    const viewed = statusActive.filter(foo => foo.data.every(fii => fii.status_read.length));

    console.log("status page", recent);


    function handleNewStatus(files: FileList) {
        if (files) {
            handleCompress(files[0])
        }

    }

    useEffect(() => {

        if (progress === 100) {
            if (result?.file) {
                const existing = newStatus.find(foo => foo.url === result.url)
                if (existing) return
                setNewStatus(pv => [...pv, { url: result.url, file: result.file, text: "" }])
                handleReset()
                if (statusRouter !== "photo") {
                    handleRouter("photo");
                }
            }
        }
    }, [progress, statusRouter, result])

    function handleEditStatus(text: string, index: number) {

        setNewStatus(pv => pv.map((foo, i) => {
            if (i === index) {
                return {
                    ...foo,
                    text: text
                }
            } else {
                return foo
            }
        }))

    }

    function handleCreateStatus() {

        newStatus.forEach(file => {
            socket?.emit("upload-status", file, (err: string, result: any) => {
                if (!err) {
                    handleStoreUser(result)
                    handleRouter("idle");
                }
            })
        })

        setNewStatus([])

    }

    console.log(newStatus);


    function handleRouter(name: StatusRouterType) {
        setStatusRouter(name);
    }

    function handlerViewStatus(index: number, type: "recent" | "viewed" | "user") {
        const isView = type === "recent" ? statusActive[index].data.findIndex(foo => !foo.status_read.length) : 0;
        setSlide(pv => ({ ...pv, index: isView || 0, indexStatus: index, user: type === "user" && true }));
        setStatusRouter("view")
    }

    function handleDeleteStatus(url: string) {
        setNewStatus(pv => pv.filter(foo => foo.url !== url))
    }

    function handleNext() {
        if (currentStatus.data.length === slide.index + 1) {
            const nextStatus = recent.filter(foo => foo.username !== statusActive[slide.indexStatus].username);
            if (nextStatus[0]) {
                const finalStatus = nextStatus.length === 1 && nextStatus[0].data.filter(foo => !foo.status_read.length).length === 1;
                setSlide(pv => ({
                    ...pv,
                    lastIndexStatus: pv.indexStatus,
                    indexStatus: statusActive.findIndex(foo => foo.id === nextStatus[0].id),
                    index: nextStatus[0].data.findIndex(foo => !foo.status_read.length),
                    max: finalStatus
                }))
            } else {
                handleRouter("idle");
            }
        } else {
            setSlide(pv => ({ ...pv, index: pv.index + 1 }))
        }
    }

    function handlePrev() {
        if (slide) {
            const nextStatus = recent.filter(foo => foo.username !== statusActive[slide.indexStatus].username);
            if (nextStatus[0]) {
                const finalStatus = nextStatus.length === 1 && nextStatus[0].data.filter(foo => !foo.status_read.length).length === 1;
                setSlide(pv => ({
                    ...pv,
                    indexStatus: statusActive.findIndex(foo => foo.id === nextStatus[0].id),
                    index: nextStatus[0].data.findIndex(foo => !foo.status_read.length),
                    max: finalStatus
                }))
            } else {
                handleRouter("idle");
            }
        } else {
            setSlide(pv => ({ ...pv, index: pv.index + 1 }))
        }
    }

    useEffect(() => {


        // Handle status read logic

        if (currentStatusData === undefined) return

        if (statusRouter !== "view") return

        if (
            currentStatus.username !== user.username &&
            currentStatusData.status_read.length === 0
        ) {
            socket?.emit("readed-status", {
                status_id: currentStatusData.id,
                contact_id: currentStatus.contact_id,
                user_id: user.id
            }, (err: string, result: any) => {
                if (err) {
                    console.error(err);
                } else {
                    hanldeReadStatus(currentStatus.username, currentStatusData.id, result);
                }
            });
        }


    }, [slide, currentStatusData, currentStatus, user, socket, statusRouter])

    return (
        statusRouter === "text" ?
            <StatusText
                back={handleRouter}
            /> : statusRouter === "view" ?
                <StatusView
                    slide={slide}
                    handleRoute={handleRouter}
                    next={handleNext}
                    prev={handlePrev}
                /> :
                statusRouter === "photo" ?
                    <StatusPhoto
                        files={newStatus}
                        handleAddStatus={handleNewStatus}
                        handleCreateStatus={handleCreateStatus}
                        handleDeleteStatus={handleDeleteStatus}
                        handleEditStatus={handleEditStatus}
                        progress={progress}
                    /> : (
                        <ContactContentLayout>
                            <HeaderContactLayout
                                label='Status'
                            />

                            <div className='py-6 px-4 flex flex-col text-white'>
                                <ModalTransparent
                                    button={() => (
                                        <div className='flex gap-3 pb-10'>
                                            {
                                                userStatus?.data.length ? (
                                                    <div
                                                        onClick={() => handlerViewStatus(0, "user")}
                                                        className=''
                                                    >
                                                        <img
                                                            className={`w-[45px] h-[45px] aspect-square object-cover rounded-full mt-2 outline-offset-2 outline outline-2 outline-gray-400`}
                                                            src={userStatus.data[userStatus.data.length - 1].src}
                                                            alt="" />

                                                    </div>
                                                ) : (
                                                    <span className='w-[45px] aspect-square rounded-full bg-gray-400 flex justify-center items-center'>
                                                        {user.username?.charAt(0).toUpperCase()}
                                                    </span>
                                                )
                                            }
                                            <div className='flex flex-col items-start'>
                                                <h3>My Status</h3>
                                                <p className='text-[.8rem] text-icon-color'>Click to add update status</p>
                                            </div>
                                        </div>
                                    )}
                                >
                                    {() => (
                                        <div className='absolute flex flex-col top-[70%] w-[180px] p-4 items-start gap-4 bg-bg-primary z-50'>
                                            <button className='relative'>
                                                <input
                                                    disabled={progress > 0}
                                                    type='file'
                                                    accept='.png, .jpg, .jpeg'
                                                    onChange={(e) => handleNewStatus(e.target.files!)}
                                                    className='absolute top-0 left-0 bottom-0 right-0 opacity-0'
                                                />
                                                {progress ? "Compressing.. " + progress : "Photo & video"}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    handleRouter("text");
                                                    // handleTgl()
                                                }}
                                            >
                                                Text
                                            </button>
                                        </div>
                                    )}
                                </ModalTransparent>
                                <div className=''>
                                    <h3 className='text-green-primary pl-1'>RECENT</h3>
                                    <div className='flex flex-col py-5'>
                                        {
                                            recent.length >= 1 ? (
                                                recent.map((foo) => {
                                                    return (
                                                        <button
                                                            key={foo.id}
                                                            onClick={() => handlerViewStatus(statusActive.findIndex(st => st.id === foo.id), "recent")}
                                                        >
                                                            <StatusCard data={foo} />
                                                        </button>
                                                    )
                                                })
                                            ) : <span className='ml-2'>Tidak ada status</span>
                                        }
                                    </div>
                                </div>
                                {
                                    viewed.length >= 1 && (
                                        <div>
                                            <h3 className='text-green-primary pl-1'>VIEWED</h3>
                                            <div className='flex flex-col'>
                                                {
                                                    viewed.map((foo, i) => {
                                                        return (
                                                            <button
                                                                key={foo.id}
                                                                onClick={() => handlerViewStatus(statusActive.findIndex(st => st.id === foo.id), "viewed")}
                                                            >
                                                                <StatusCard data={foo} />
                                                            </button>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                }

                            </div >
                        </ContactContentLayout >
                    )
    )
}

export default StatusContentContact
