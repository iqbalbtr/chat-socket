import { colors } from '../../../../../../../constants/color'
import FieldNewContact from '../../../contact/newContact/FieldNewContact'
import Icon from '../../../../../../../constants/icons'

function EditProfileMessage({ back }: { back: () => void }) {
    return (
        <div
            style={{
                width: "640px",
                overflow: "hidden"
            }}
        >
            <div className='text-white bg-bg-secondary mb-16 h-fit min-h-screen'>
                <div className={`bg-bg-primary flex gap-2 px-3 items-center py-3.5`}>
                    <button
                        style={{
                            cursor: "pointer"
                        }}
                        onClick={back}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width={30} viewBox="0 0 24 24" id="times">
                            <path fill={colors.ICON_COLOR}
                                d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path>
                        </svg>
                    </button>

                    <h3>Edit Kontak</h3>
                </div>

                <div className='flex w-full flex-col items-center justify-center py-12'>
                    <span className='w-[190px] aspect-square rounded-full bg-gray-500'></span>
                    <p className='text-icon-color pt-3'>@username</p>
                </div>

                <div className="flex flex-col gap-2 px-10 py-4 text-white">
                    <div className="flex flex-col items-start gap-2 py-1">
                        <h2 className="text-sm">First name</h2>
                        <FieldNewContact name='fisrt_name' />
                    </div>
                    <div className="flex flex-col items-start gap-2 py-1">
                        <h2 className="text-sm">Last name</h2>
                        <FieldNewContact name='last_name' />
                    </div>
                </div>

                <div className="py-12 flex justify-center">
                    <button>
                        {Icon.check({
                            size: 45,
                            color: "#fff",
                            classname: "p-1 rounded-full bg-green-accent"
                        })}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default EditProfileMessage
