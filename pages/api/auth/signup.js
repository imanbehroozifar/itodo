import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
    try {
        await connectDB()
        console.log('DB')
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ status: "failed", message: "Error : Connecting to DB" })
    }
    if (req.method !== 'POST') return;

    const { email, password } = req.body
    console.log(email,password)

    if (!email || !password) {
        res.status(422).json({ status: "failed", message: "Error : invalid data  " })
    }

    const existingUser = await User.findOne({ email:email })
    if (existingUser) {
        res.status(422).json({ status: "failed", message: "Error : user exist already " })
    }
    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({ email:email, password: hashedPassword })
    console.log(newUser,"user")
    res.status(200).json({ status: "success" , message: "created user!" })

}