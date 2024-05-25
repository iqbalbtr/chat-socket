import { useRef, useState } from "react";

function FieldNewContact({name}:{name: string}) {

    const [focus, setFocus] = useState(false);
    const [string, setString] = useState("");
    const field = useRef<HTMLInputElement | null>(null);

    return (
        <div className='relative w-full'>
            <input
                ref={field}
                name={name}
                type="text"
                onFocus={() => setFocus(true)}
                value={string}
                className={`bg-transparent w-full outline-none text-base text-white border-hover-color border-b-2 focus:border-green-primary ${focus && "border-b-2 "}`}
                onChange={(e) => setString(e.target.value)}
            />
            
        </div>
    )
}

export default FieldNewContact
