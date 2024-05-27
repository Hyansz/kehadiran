const { sql } = require("@vercel/postgres");

async function delData(req,res) {
    try {
        
        if(req.method !== "DELETE") {
            return res.status(405).json({message:"Method tidak diperbolehkan"})
        }

        const {id} = req.query

        if(!id) {
            return res.status(400).json({message:"Id tidak boleh kosong"})
        }

        const {rows} = await sql`DELETE FROM absensi WHERE id = ${id}`

        res.status(200).json({message:"Success", data:rows[0]})
    } catch(e){
        console.log("ADA ERROR ", e)
        return res.status(500).json({message:"Terjadi error,"})
    }
}

export default (delData)