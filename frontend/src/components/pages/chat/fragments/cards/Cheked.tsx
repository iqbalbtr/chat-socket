import React from 'react'
import Icon from '../../../../../constants/icons'
import { colors } from '../../../../../constants/color'

function Cheked({ value, action }: { value: boolean, action?: () => void }) {
    return (
        <button onClick={action} className='z-[999] relative'>
            <div className={`w-[25px] h-[25px] mx-6 my-2 relative z-10 flex border-2 ${value && "bg-green-accent border-green-accent"}`}>
                {
                    value ? (
                        Icon.check({
                            size: 25,
                            color: colors.BG_PRIMARY
                        })
                    ) : null
                }
            </div>
        </button>
    )
}

export default Cheked
