import React, { ReactNode, useState } from "react"

export type NewGroupType = {
    name: string,
    bio: string;
    member: {
        role?: string,
        username: string
    }[]
}

export type GroupMember = {
    role: string;
    user: {
        id: string;
        username: string;
        email: string;
        user_info: {
            first_name: string
            last_name: string;
            bio: string;
        }
    }
}

type ContextType = {
    group: any[],
    fn: {
        handleNewGroup: (payload: NewGroupType, callback:(err?: string) => void) => void;
        handleLeaveGroup: (groupId: string) => void;
        handleUpdateGroup: () => void;
    }
};

const Context = React.createContext<ContextType>({
  group: [],
  fn:{
    handleNewGroup: () => {},
    handleLeaveGroup: () => {},
    handleUpdateGroup: () => {}
  } 
});

export function useGroupContact() {
    return React.useContext(Context);
}


export default function GroupContactContext({ children }: { children: ReactNode }) {


    const [group, setGroup] = useState<GroupMember[]>([])


    const handleNewGroup = React.useCallback(async (payload: NewGroupType, callback:(err?: string) => void) => {
        try {
            const res = await fetch("http://localhost:8080/api/group", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(payload)
            });
            if(res){
                const result = await res.json()
                callback("");
                setGroup(result)
            }
        } catch (error: any) {
            callback(error.message);
        }

    }, [group]);    

    return (
        <Context.Provider
            value={{
                group: group,
                fn:{
                    handleNewGroup: handleNewGroup ,
                    handleLeaveGroup: () => {},
                    handleUpdateGroup: () => {}
                }
            }}
        >
            {children}
        </Context.Provider>
    )
}

