const { sql } = require("@vercel/postgres");

async function insertData(req,res) {
    try {
        
        if(req.method !== "POST") {
            return res.status(405).json({message:"Method tidak diperbolehkan"})
        }

        const {id_karyawan,jam_datang,keterangan} = req.body

        if(!id_karyawan) {
            return res.status(400).json({message:"Nama tidak boleh kosong"})
        }

        if(!jam_datang) {
            return res.status(400).json({message:"Jam datang tidak boleh kosong"})
        }

          const rows = await sql` INSERT INTO absensi (id_karyawan,jam_datang,keterangan,hari,bulan,tahun)
          VALUES (${id_karyawan},${jam_datang},${keterangan},${(new Date()).getDate()},${(new Date()).getMonth() + 1}, ${(new Date()).getFullYear()})`

        res.status(200).json({message:"Success", data:rows})
    } catch(e){
        console.log("ADA ERROR ", e)
        return res.status(500).json({message:"Terjadi error,"})
    }
}

export default (insertData)