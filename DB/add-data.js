require('dotenv').config({path:'.env.development.local'});

const {sql} = require('@vercel/postgres')

async function execute() {

    try {
        const rows = await sql`
        INSERT INTO transaksi (keterangan,income,outcome,tanggal)
        VALUES ('JUDUL','Isi teks')
        `;
        console.log(rows)
    } catch (error) {
        console.log(error)
    }

}

execute()