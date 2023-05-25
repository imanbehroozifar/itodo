import User from "@/models/User";
import { veryfiyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
const authOptions = {
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                const { email, password } = credentials
                try {
                    await connectDB()
                } catch (error) {
                    throw new Error("Error : connecting to db")
                }
                if (!email || !password) {
                    throw new Error("Error : invalid data ")
                }
                const user = await User.findOne({ email: email })
                console.log('use', user)
                if (!user) {
                    throw new Error("Error :user dosent exist alreay ")
                }
                const isValid = await veryfiyPassword(password, user.password)
                if (!isValid) {
                    throw new Error("Error :user name or password is incorrect ")
                }
                return { email: email }
            }
        })
    ]
}
export default NextAuth(authOptions)