const { hash, compare } = require("bcryptjs");


async function hashPassword(password) {
    const hashedPassword = await hash(password, 12)
    return hashedPassword
}

async function veryfiyPassword(password, hashedPassword) {
    const isValid = await compare(password, hashedPassword)
    return isValid
}

export { hashPassword, veryfiyPassword }