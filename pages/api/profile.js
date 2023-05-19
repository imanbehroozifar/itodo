import User from "@/models/User"
import { veryfiyPassword } from "@/utils/auth"
import connectDB from "@/utils/connectDB"
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
    try {
        await connectDB()
        console.log("connecting")
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ status: "failed", message: "Error: in Connencting to DB" })
    }
    const session = await getSession({ req })
    if (!session) {
        return res.status(401)
            .json({ status: "failed", message: "Error: you not logged in!" })

    }
    const user = await User.findOne({ email: session.user.email })
    if (!user) {
        return res.status(404)
            .json({ status: "failed", message: "Error: user dosent exist" })
    }
    if (req.method === "POST") {
        const { name, lastName, password } = req.body
        const isValid = await veryfiyPassword(password, user.password)
        if (!isValid) {
            return res.status(422)
                .json({ status: "failed", message: "Error: password is incorrect" })
        }
        user.name = name;
        user.lastName = lastName;
        user.save();
        res.status(200)
            .json({ status: "success", data: { name, lastName, email: session.user.email } })
    }



}