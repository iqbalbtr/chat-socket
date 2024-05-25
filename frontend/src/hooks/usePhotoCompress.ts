import imageCompression from 'browser-image-compression';
import { useEffect, useState } from 'react'

export default function usePhotoCompress(file?: File) {
    
    const [progress, setProggres] = useState(0);
    const [error, setError] = useState();
    const [result, setResult] = useState<{url: string, file: File} | null>();
    
        async function compressPhoto(photo: File, store: boolean = false){
            try {
                const compress = await imageCompression(photo, {
                    useWebWorker: true,
                    onProgress: (pr) => !store && setProggres(pr)
                })
    
                if(compress && !store){
                    const url = URL.createObjectURL(compress);
                    setResult({file: compress, url: url})
                } else {
                    return compress
                }
    
            } catch (error: any) {
                setError(error.message);
            }
        }

        function handleReset(){
            setResult(null)
            setProggres(0)
        }

    useEffect(() => {
        if(!file) return
        compressPhoto(file);
    }, [file])


    return {
        progress,
        result,
        error,
        handleCompress: compressPhoto,
        handleReset: handleReset
    }
}
