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
    ),
    circle: (payload: IconType) => (
        <svg
            width={payload.size}
            height={payload.size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="circle"
            className={payload.classname}
        >
            <path
                fill={payload.color}
                d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
            >
            </path>
        </svg>
    ),
    pallete: (payload: IconType) => (
        <svg
            width={payload.size}
            height={payload.size}
            className={payload.classname}
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            id="palette"
        >
            <path
                fill={payload.color}
                d="M7.42,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.41A1,1,0,0,0,7.42,15.54Zm0-8.49a1,1,0,0,0,0,1.41,1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.41A1,1,0,0,0,7.42,7.05Zm4.95,10a1,1,0,1,0,1,1A1,1,0,0,0,12.37,17Zm-6-6a1,1,0,1,0,1,1A1,1,0,0,0,6.37,11Zm6-6a1,1,0,1,0,1,1A1,1,0,0,0,12.37,5Zm3.54,2.05a1,1,0,1,0,1.41,0A1,1,0,0,0,15.91,7.05Zm6.3,0a11,11,0,1,0-7.85,15.74,3.87,3.87,0,0,0,2.5-1.65A4.2,4.2,0,0,0,17.47,18a5.65,5.65,0,0,1-.1-1,5,5,0,0,1,3-4.56,3.84,3.84,0,0,0,2.06-2.25A4,4,0,0,0,22.21,7.08Zm-1.7,2.44a1.9,1.9,0,0,1-1,1.09A7,7,0,0,0,15.37,17a7.3,7.3,0,0,0,.14,1.4,2.16,2.16,0,0,1-.31,1.65,1.79,1.79,0,0,1-1.21.8,8.72,8.72,0,0,1-1.62.15,9,9,0,0,1-9-9.28A9.05,9.05,0,0,1,11.85,3h.51a9,9,0,0,1,8.06,5A2,2,0,0,1,20.51,9.52ZM12.37,11a1,1,0,1,0,1,1A1,1,0,0,0,12.37,11Z"
            >
            </path>
        </svg>
    ),
    corner_right: (payload: IconType) => (
        <svg
            width={payload.size}
            height={payload.size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="corner-up-right-alt"
            className={payload.classname}
        >
            <path
                fill={payload.color}
                d="M19.92,10.12a1,1,0,0,0-.21-.33l-3-3a1,1,0,1,0-1.42,1.42l1.3,1.29H7a3,3,0,0,0-3,3v4a1,1,0,0,0,2,0v-4a1,1,0,0,1,1-1h9.59l-1.3,1.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l3-3a1,1,0,0,0,.21-.33A1,1,0,0,0,19.92,10.12Z"
            >
            </path>
        </svg>
    ),
    trash: (payload: IconType) => (
        <svg
            width={payload.size}
            height={payload.size}
            className={payload.classname}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="trash">
            <path
                fill={payload.color}
                d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z"
            >
            </path>
        </svg>
    ),
    ban: (payload: IconType) => (
        <svg
            width={payload.size}
            height={payload.size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="ban"
        >
            <path
                fill={payload.color}
                d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,0,1-8-8A7.92,7.92,0,0,1,5.69,7.1L16.9,18.31A7.92,7.92,0,0,1,12,20Zm6.31-3.1L7.1,5.69A7.92,7.92,0,0,1,12,4a8,8,0,0,1,8,8A7.92,7.92,0,0,1,18.31,16.9Z"
            >
            </path>
        </svg>
    ),
    files: (payload: IconType) => (
        <svg
            width={payload.size}
            height={payload.size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="file">
            <path
                fill={payload.color}
                d="M20,8.94a1.31,1.31,0,0,0-.06-.27l0-.09a1.07,1.07,0,0,0-.19-.28h0l-6-6h0a1.07,1.07,0,0,0-.28-.19l-.09,0L13.06,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V9S20,9,20,8.94ZM14,5.41,16.59,8H14ZM18,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V5A1,1,0,0,1,7,4h5V9a1,1,0,0,0,1,1h5Z"
            >
            </path>
        </svg>
    )
}

export default Icon;