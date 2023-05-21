const { prisma } = require('../prisma/prisma-client')
const brypt = require('bcrypt')
const jwt = require('jsonwebtoken')
 

const login = async (req, res) => {
    try{
        const { email, password } = req.body
        if(!email || !password) {
            return res.status(400).json({ message: 'please, indicate correct info'})
        }
    
        const user = await prisma.user.findFirst({
            where: {
                email,
            }
        })
    
        const isPasswordCorrect = user && (await brypt.compare(password, user.password))
        const secret = process.env.JWT_SECRET
    
        if (user && isPasswordCorrect && secret) {
            res.status(200).json({
                id: user.id,
                email: user.email,
                name: user.name,
                token: jwt.sign({ id: user.id}, secret, { expiresIn: '30d'})
            })
        } else {
            return res.status(400).json({ message: "email or password doesn't exist"})
        }
    } catch {
        return res.status(500).json({ message: "email or password doesn't exist"})
    }   
}

const register = async (req, res) => {
    try {
        const {email, password, name} = req.body;
        if(!email || !password || !name) {
            return res.status(400).json({ message: 'please, indicate nesessary information!'})
        }
    
        const registeredUser = await prisma.user.findFirst({
            where: {
                email
            }
        })
    
        if(registeredUser) {
            return res.status(400).json({message: 'user has already been created:('})
        }
    
        const salt = await brypt.genSalt(10);
        const hashedPassword = await brypt.hash(password, salt);
    
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            }
        })
    
        const secret = process.env.JWT_SECRET
    
        if (user && secret) {
            res.status(201).json({
                id: user.id,
                email: user.email,
                name,
                token: jwt.sign({ id: user.id}, secret, { expiresIn: '30d'})
            })
        } else {
            return res.status(400).json({massage: "server's doesn't work"})
        }
    } catch {
        return res.status(500).json({massage: "server's doesn't work"})
    }

    
}

const current = (req, res) => {
    return res.status(200).json(req.user)
}

module.exports = {
    login,
    register,
    current
}