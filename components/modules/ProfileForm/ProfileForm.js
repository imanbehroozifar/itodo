const ProfileForm = ({
    name,
    lastName,
    password,
    setName,
    setLastName,
    setPassword,
    submitHandler }) => {
    return (
        <>
            <div className="profile-form__input">
                <div>
                    <label htmlFor="name">Name :</label>
                    <input id="name" value={name} type="text" onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="last-name">Last Name :</label>
                    <input id="last-name" value={lastName} type="text" onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">password :</label>
                    <input id="password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            <button onClick={submitHandler}>Save</button>
        </>
    )
}

export default ProfileForm