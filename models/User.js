import { models, Schema, model } from "mongoose"

const userSchema = new Schema({

    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    lastName: {
        type: String
    },
    todos: [{ title: String, status: String }], //استاتوس وضعیت او تودو رو نشون میده 
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    }
})

const User = models.User || model("user", userSchema)

export default User