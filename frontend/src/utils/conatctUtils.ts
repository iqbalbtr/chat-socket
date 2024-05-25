import { UserContact, GroupType } from "@contexts/chat/ChatContext";

export function isUser(obj: any): obj is UserContact {
    return (
        typeof obj.id === 'string' &&
        typeof obj.first_name === 'string' &&
        typeof obj.last_name === 'string' || obj.last_name === null &&
        typeof obj.bio === 'string' || obj.bio === null &&
        typeof obj.username === 'string' &&
        typeof obj.email === 'string'
    );
}

export function isGroup(obj: any): obj is GroupType {
    return (
        typeof obj.id === 'string' &&
        typeof obj.name === 'string' &&
        typeof obj.bio === 'string' &&
        Array.isArray(obj.member) &&
        obj.member.every((member: any) => isUser(member))
    );
}
