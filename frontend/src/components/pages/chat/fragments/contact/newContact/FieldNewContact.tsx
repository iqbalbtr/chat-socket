import { useRef, useState } from "react";
import Icon from "../../../../../../constants/icons";
import { colors } from "../../../../../../constants/color";

function FieldNewContact() {

    const [focus, setFocus] = useState(false);
    const [string, setString] = useState("");
    const field = useRef<HTMLInputElement | null>(null);

    async function handleSubmit() {

        if(!string) return;

        // await action();
        setFocus(false);
    }

    return (
        <div className='relative w-full'>
            <input
                ref={field}
                type="text"
                onFocus={() => setFocus(true)}
                value={string}
                // defaultValue={value}
                className={`bg-transparent w-full outline-none text-base text-white border-hover-color border-b-2 focus:border-green-primary ${focus && "border-b-2 "}`}
                onChange={(e) => setString(e.target.value)}
            />
            
        </div>
    )
}

export default FieldNewContact
