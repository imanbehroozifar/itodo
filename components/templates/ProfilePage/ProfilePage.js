import ProfileForm from '@/components/modules/ProfileForm/ProfileForm'
import React, { useState } from 'react'
import { CgProfile } from 'react-icons/cg'
const ProfilePage = () => {
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const submitHandler = async () => {
        const res = await fetch('/api/profile', {
            method: "POST",
            body: JSON.stringify({ name, lastName, password }),
            headers: { "Content-Type": "application/json" }
        })
        const data = await res.json()
        console.log(data)

    }
    return (
        <div className='profile-form'>
            <h2>
                <CgProfile />
                Profile
            </h2>
            <ProfileForm
                name={name}
                lastName={lastName}
                password={password}
                setName={setName}
                setLastName={setLastName}
                setPassword={setPassword}
                submitHandler={submitHandler}

            />
        </div>
    )
}

export default ProfilePage