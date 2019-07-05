const bcrypt = require('bcrypt')
module.exports = {
    register: async (req, res) => {
        let {username, password} = req.body
        username = username.toLowerCase()
        const {session} = req
        const db = req.app.get('db')
        const userFound = await db.check_username({username})
        if (userFound[0]) return res.status(403).send('Username taken')

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = await db.create_user({username, password: hash, imgurl: `https://robohash.org/${username}`})
        session.user = {id: newUser[0].user_id, username, imgurl: newUser[0].imgurl}
        res.status(200).send(session.user)
    },
    login: async (req, res) => {
        let {username, password} = req.body
        username = username.toLowerCase()
        const {session} = req
        const db = req.app.get('db')
        const userFound = await db.check_username({username})
        if (!userFound[0]) return res.status(408).send('Could not find user') 

        const authenticated = bcrypt.compareSync(password, userFound[0].password)
        if (authenticated) {
            session.user = {
                id: userFound[0].user_id,
                username,
                imgurl: userFound[0].imgurl
            }
            return res.status(200).send(session.user)
        } else res.status(408).send('Invalid Credentials')

    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getData: (req, res) => {
        if (req.session) return res.status(200).send(req.session.user)
        res.status(521).send('Login First')
    }
}