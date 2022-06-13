import express from "express"
import { v4 as uuid } from "uuid"
import cors from "cors"
import { randEmail, randFirstName, randLastName, randSlug } from "@ngneat/falso"

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors({ origin: "*" }))

app.listen(port, () => console.log(`Running on port: ${port}`))

const personFactory = (count?: number) => {
    let person = () => ({
        _id: uuid(),
        firstName: randFirstName(),
        lastName: randLastName(),
        email: randEmail(),
        slug: randSlug()
    })
    return count ? Array(count).fill("").map(() => person()) : person();
}
const db = {
    users: personFactory(10)
}

app.get("/", (req, res) => {
    res.json(db.users)
})