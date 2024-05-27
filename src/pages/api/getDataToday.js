const { sql } = require("@vercel/postgres");

export default async function getData(req,res) {
    try{
        if(req.method !== "GET") {
            return res.status(405).json({message:"Method tidak diperbolehkan"})
        }

        const {rows} = await sql`SELECT * FROM absensi WHERE hari = ${(new Date()).getDate()} AND bulan =  ${(new Date()).getMonth() + 1} AND tahun =  ${(new Date()).getFullYear()}`

        res.status(200).json({data:rows})
    }catch(e){}
}