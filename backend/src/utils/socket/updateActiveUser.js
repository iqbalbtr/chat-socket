function updateActiveUser(client_active, current_user) {
    const existing_user = client_active.users.find(client => client.username === current_user.username);
    if (!existing_user) {
        client_active = {
            count: client_active.count + 1,
            users: [
                ...client_active.users,
                {
                    active: true,
                    ...current_user
                }
            ]
        }
    } else {
        client_active = {
            ...client_active,
            users: client_active.users.map(client => {
                if (client.username === current_user.username) {
                    return {
                        ...client,
                        active: true
                    }
                } else {
                    return client
                }
            })
        }
    }

    return client_active
}

module.exports = {
    updateActiveUser: updateActiveUser
};