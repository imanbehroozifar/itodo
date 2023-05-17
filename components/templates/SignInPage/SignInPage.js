import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {signIn, useSession} from 'next-auth/react'

const SignInPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    const { status } = useSession()
    useEffect(() => {
        if ( status === "authenticated")router.replace("/")
    },[status])
    const loginHandler = async () => {
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false
        })
        if (!res.error) router.replace("/")
        //09152491990
    }
    return (
        <div className="signin-form">
            <h3>Login Form</h3>
            <input name="email" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={loginHandler}>Login</button>
            <div>
                <p>Create an account</p>
                <Link href='/signup'>Sign Up</Link>
            </div>
        </div>
    )
}

export default SignInPage