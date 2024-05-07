type IconType = {
    size: number,
    color: string,
    classname?: string
}

const Icon = {
    arrow_left: (payload: IconType) => (
        <svg
            className={payload.classname}
            width={payload.size}
            height={payload.size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="arrow-left">
            <path
                fill={payload.color}
                d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z"
            >
            </path>
        </svg>
    ),
    arrow_right: (payload: IconType) => (
        <svg
            className={payload.classname}
            width={payload.size}
            height={payload.size}
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            id="arrow-right"
        >
            <path
                fill={payload.color}
                d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z"
            >
            </path>
        </svg>
    ),
    search: (payload: IconType) => (
        <svg
            className={payload.classname}
            width={payload.size}
            height={payload.size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="search">
            <path
                fill={payload.color}
                d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"
            ></path>
        </svg>
    ),
    check: (payload: IconType) => (
        <svg
            width={payload.size}
            className={payload.classname}
            height={payload.size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24" id="check"
        >
            <path
                fill={payload.color}
                d="M18.71,7.21a1,1,0,0,0-1.42,0L9.84,14.67,6.71,11.53A1,1,0,1,0,5.29,13l3.84,3.84a1,1,0,0,0,1.42,0l8.16-8.16A1,1,0,0,0,18.71,7.21Z"
            >
            </path>
        </svg>
    ),
    pen: (payload: IconType) => (
        <svg
            width={payload.size}
            height={payload.size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="pen"
            className={payload.classname}
        >
            <path
                fill={payload.color}
                d="M22,7.24a1,1,0,0,0-.29-.71L17.47,2.29A1,1,0,0,0,16.76,2a1,1,0,0,0-.71.29L13.22,5.12h0L2.29,16.05a1,1,0,0,0-.29.71V21a1,1,0,0,0,1,1H7.24A1,1,0,0,0,8,21.71L18.87,10.78h0L21.71,8a1.19,1.19,0,0,0,.22-.33,1,1,0,0,0,0-.24.7.7,0,0,0,0-.14ZM6.83,20H4V17.17l9.93-9.93,2.83,2.83ZM18.17,8.66,15.34,5.83l1.42-1.41,2.82,2.82Z"
            >
            </path>
        </svg>
    ),
    times: (payload: IconType) => (
        <svg
            width={payload.size}
            height={payload.size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="times"
            className={payload.classname}
        >
            <path
                fill={payload.color}
                d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
            >
            </path>
        </svg>
    )
}

export default Icon;