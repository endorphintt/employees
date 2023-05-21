const { prisma } = require('../prisma/prisma-client.js')

const all = async (req, res) => {
    try {
        const employes = await prisma.employee.findMany()

        res.status(200).json(employes)
    } catch {
        res.status(500).json({message: 'server error'})
    }
}

const add = async (req, res) => {
    try {
        const data = req.body

        if (!data.firstName || !data.address || !data.lastName || !data.age) {
            return res.status(400).json({ message: 'indicate everything'})
        }

        const employee = await prisma.employee.create({
            data: {
                ...data,
                userId: req.user.id  
            }
        })

        return res.status(201).json(employee)

    } catch {
        res.status(500).json({message: 'server error'})
    }
}

const remove = async (req, res) => {
    const { id } = req.body;

    try{
        await prisma.employee.delete({
            where: {
                id
            }
        })

        res.status(204).json({message: 'Done!'})
    } catch {
        res.status(500).json({ message: 'server error'})
    }
}

const edit = async (req, res) => {
    const data = req.body
    const id = data.id

    try {
        await prisma.employee.update({
            where: {
                id
            },
            data
        })

        res.status(204).json({message: 'Done!'})
    } catch {
        res.status(500).json({ message: 'server error' })
    }
}

const employee = async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await prisma.employee.findUnique({
            where: {
                id
            }
        })

        res.status(200).json(employee)
    } catch {
        res.status(500).json({ message: 'server error'})
    }
}

module.exports = {
    all,
    add,
    remove,
    employee,
    edit
}