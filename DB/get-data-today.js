require('dotenv').config({path:'.env.development.local'});

const {sql} = require('@vercel/postgres')

async function execute() {

    try {
        const {rows} = await sql`
        SELECT * FROM absensi WHERE tanggal = CURRENT_DATE `
        console.log(rows)
    } catch (error) {
        console.log(error)
    }

}

execute()