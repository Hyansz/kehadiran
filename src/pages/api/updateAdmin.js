const { sql } = require("@vercel/postgres");

async function updateData(req,res) {
    try {
        
        if(req.method !== "PUT") {
            return res.status(405).json({message:"Method tidak diperbolehkan"})
        }

        const {id_karyawan, jam_datang, jam_pulang, hari, bulan, tahun} = req.body
        const {id} = await req.query

        if(!id) {
            return res.status(400).json({message:"Id tidak boleh kosong"})
        }

        const {rows} = await sql`UPDATE absensi SET id_karyawan = ${id_karyawan}, jam_datang = ${jam_datang} ,jam_pulang = ${jam_pulang}, hari = ${hari}, bulan =${bulan}, tahun = ${tahun} WHERE id = ${id}`

        res.status(200).json({message:"Success", data:rows})
    } catch(e){
        console.log("ADA ERROR ", e)
        return res.status(500).json({message:"Terjadi error,"})
    }
}

export default (updateData)