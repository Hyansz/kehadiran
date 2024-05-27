import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function EditPage() {
    const router = useRouter()
    const {idEdit} = router.query
    const [dataDetail,setDataDetail] = useState()

    useEffect(() => {
        if(!idEdit) {
            return;
        }
        fetch(`/api/getDataDetail?id=${idEdit}`)
        .then((res) => res.json())
        .then((data) => {
            setDataDetail(data.data[0])
        })
        .catch((err) => {
            alert("eror ", err.message)
        })
    },[idEdit]);

    const handleSumbit = (event) => {
        event.preventDefault()
        const id_karyawan = event.target.id_karyawan.value;
        const jam_datang = event.target.jam_datang.value;
        const jam_pulang = event.target.jam_pulang.value;
        const hari = parseInt(event.target.hari.value);
        const bulan = parseInt(event.target.bulan.value);
        const tahun = parseInt(event.target.tahun.value);

        console.log("jam datang ",jam_datang);
        console.log("jam pulang ",jam_pulang);

        fetch(`/api/updateAdmin?id=${idEdit}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: idEdit,
                id_karyawan:id_karyawan,
                jam_datang:jam_datang,
                jam_pulang:jam_pulang,
                hari:hari,
                bulan:bulan,
                tahun:tahun,

            }),
        })
        .then((res) => res.json())
        .then((data) => {
            alert("Success")
            router.push('/admin')
        })
        .catch((err) => {
            alert("eror ", err.message)
        })
    }

    return (
        <div>
            <h1>Halaman edit</h1>

            {dataDetail === null && <p>Data Kosong</p>}
            {dataDetail === undefined && <p>Loading...</p>}
            {dataDetail && 
                (
                    <form onSubmit={handleSumbit}>
                        <div>
                            <label>Nama: </label>
                            <input name="id_karyawan" required defaultValue={dataDetail.id_karyawan}></input>
                        </div>
                        <div>
                            <label>Jam datang: </label>
                            <input name="jam_datang" type="text" defaultValue={dataDetail.jam_datang}/>
                        </div>
                        <div>
                            <label>Jam pulang: </label>
                            <input name="jam_pulang" type="text" defaultValue={dataDetail.jam_pulang}/>
                        </div>
                        <div>
                            <label>Tanggal: </label>
                            <input name="hari" required placeholder="Hari" defaultValue={dataDetail.hari}></input>
                            <input name="bulan" required placeholder="Bulan" defaultValue={dataDetail.bulan}></input>
                            <input name="tahun" required placeholder="Tahun" defaultValue={dataDetail.tahun}></input>
                        </div>
                        <button type="submit">Edit</button>
                        <Link href={`/admin`}>Kembali</Link>
                    </form>
                )
            }
        </div>
    )
}