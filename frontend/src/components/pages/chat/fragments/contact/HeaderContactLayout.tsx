import { ReactNode } from 'react'
import Icon from '../../../../../constants/icons';
import { useRouterContact } from '@contexts/chat/contact/RouterContactContext';

function HeaderContactLayout({ label, back, children }: { label: string, back?: () => void; children?: ReactNode }) {

    const { fn: { handleContent } } = useRouterContact();

    return (
        <nav className='px-6 pt-12 bg-bg-primary pb-5'>
            <div className='flex justify-between'>

                {/* Action navigation start */}
                <div className='flex gap-6'>
                    <button onClick={back ? () => back() : () => handleContent("back")}>
                        {Icon.arrow_left({
                            color: "#fff",
                            size: 25
                        })}
                    </button>
                    <h3 className='text-2xl text-white'>{label}</h3>
                </div>
                {/* Action navigation end */}



                {/* children start */}
                <div>
                    {children}
                </div>
                {/* children end */}

            </div>
        </nav>
    )
}

export default HeaderContactLayout
