import { ReactNode } from 'react'

type DataSwitch = {
    name: string,
    children: ReactNode
}

function SwitchLayout({ data, name }: { data: DataSwitch[], name: string }): ReactNode | null {
    return data.find(child => child.name === name)?.children
}

export default SwitchLayout
