require('dotenv').config({path:'.env.development.local'});

const {sql} = require('@vercel/postgres')

async function execute() {

    try {
        const {rows} = await sql`
        UPDATE transaksi SET keterangan = "dikasih" WHERE id = 1`
        console.log(rows)
    } catch (error) {
        console.log(error)
    }

}

execute()