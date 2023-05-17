import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getSession } from "next-auth/react";

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
        const { title, status } = req.body
        if (!title || !status) {
            return res.status(422)
                .json({ status: "failed", message: "Error: invalid data" })
        }
        user.todos.push({ title, status })
        user.save()
        return res.status(201)
            .json({ status: "success", message: "Success: todo Created" })



    } else if (req.method === "GET") {

    } else if (req.method === "PATCH") {

    }

}