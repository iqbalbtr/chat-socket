
function Profile({ username, width = 44 }: { username: string, width?: number }) {

    return (
        <div>
            <span
                style={{
                    width: width,
                    aspectRatio: 1 / 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "999px",
                    background: "#2563eb"
                }}
            >{username.charAt(0).toUpperCase()}</span>
        </div>
    )
}

export default Profile
