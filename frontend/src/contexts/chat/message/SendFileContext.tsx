import usePhotoCompress from "@hooks/usePhotoCompress";
import React, { ReactNode, useCallback, useState } from "react"
import compressPhoto from "browser-image-compression";
import { useRouterMessage } from "./RouterMessageContext";
import { useMessage } from "../MessageContext";
import { useChat } from "../ChatContext";

type ContextType = {
    files: FilesPayload[];
    fn: {
        handleAddFile: (file: File, text: string, compress: boolean) => void;
        handleRemove: (url: File) => void;
        handleSendFile: () => void;
        handleResetFile: () => void;
        handleEditFile: (id: string, { type, value }: { type: string, value: any }) => void;
    }
}

type FilesPayload = {
    file: File,
    url: string,
    text: string,
    type: string,
    compress: boolean;
}

const Context = React.createContext<ContextType>({
    files: [],
    fn: {
        handleAddFile: () => { },
        handleRemove: () => { },
        handleSendFile: () => { },
        handleResetFile: () => { },
        handleEditFile: () => { }
    }
})

export function useSendFile() {
    return React.useContext(Context)
}


function SendFileContext({
    children
}: {
    children: ReactNode
}) {

    const [files, setFiles] = useState<FilesPayload[]>([]);
    const { fn: { handleInnerMessage } } = useRouterMessage();
    const { fn: { sendMessage } } = useMessage()
    const {current} = useChat()
    // const {progress, error, handleCompress, result, handleReset} = usePhotoCompress();

    const handleAddFile = useCallback(async (file: File, text: string, compress: boolean = true) => {
        const progress = file.type.includes("images") && compress ? await compressPhoto(file, {
            useWebWorker: true,
            maxSizeMB: 4
        }) : file

        if (progress) {
            const payload: FilesPayload = {
                file: progress,
                text: text,
                url: URL.createObjectURL(progress),
                type: file.type,
                compress: compress
            }
            if (!files.length) {
                handleInnerMessage("send")
            }
            setFiles(pv => [...pv, payload]);
        }
    }, [files])

    const handleSendFile = useCallback(() => {
        if(!current) return
        files.forEach(foo => {
            sendMessage({
                input: foo.text,
                to: current.username,
                type: current.type,
            }, () => {
                
            })
        })
    }, [files])

    const handleResetFile = useCallback(() => {
        setFiles([])
    }, [files])

    const handleRemoveFile = useCallback((file: File) => {
        setFiles(pv => pv.filter(foo => foo.file !== file));
    }, [files])

    const handleEditFile = useCallback((id: string, { type, value }: { type: string, value: any }) => {
        setFiles(pv => pv.map(foo => {
            if (foo.url === id) {
                return {
                    ...foo,
                    [type]: value
                }
            } else {
                return foo
            }
        }));
    }, [files])


    return (
        <Context.Provider
            value={{
                files: files,
                fn: {
                    handleAddFile: handleAddFile,
                    handleRemove: handleRemoveFile,
                    handleSendFile: handleSendFile,
                    handleResetFile: handleResetFile,
                    handleEditFile: handleEditFile
                }
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default SendFileContext
