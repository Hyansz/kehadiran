require('dotenv').config({path:'.env.development.local'});

const {sql} = require('@vercel/postgres')

async function execute() {

    const deleteTable = await sql`DROP TABLE absensi`

    const createTable = await sql`
    CREATE TABLE IF NOT EXISTS absensi (
        id SERIAL PRIMARY KEY,
        id_karyawan VARCHAR(20) NOT NULL,
        tanggal TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        jam_datang VARCHAR(5), 
        jam_pulang VARCHAR(5),
        keterangan VARCHAR,
        hari INT,
        bulan INT,
        tahun INT
    )   
    `;
    console.log(createTable)
}

execute()