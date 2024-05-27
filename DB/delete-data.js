require('dotenv').config({path:'.env.development.local'});

const {sql} = require('@vercel/postgres')

async function execute() {

    try {
        const {rows} = await sql`
        DELETE FROM trans WHERE id = 1; `
        console.log(rows)
    } catch (error) {
        console.log(error)
    }

}

execute()