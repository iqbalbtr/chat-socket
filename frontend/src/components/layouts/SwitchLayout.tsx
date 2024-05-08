import { ReactNode } from 'react'

type DataSwitch = {
    name: string,
    children: ReactNode
}

function SwitchLayout<T>({ data, name }: { data: DataSwitch[], name: T[] }): ReactNode | null {    
    return data.find(child => child.name === name[name.length - 1])?.children
}

export default SwitchLayout
