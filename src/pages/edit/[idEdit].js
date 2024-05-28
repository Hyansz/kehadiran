import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function EditPage() {
    const router = useRouter()
    const {idEdit} = router.query
    const [dataDetail,setDataDetail] = useState()
    const [loading, setLoading] = useState(false)

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
        setLoading(true)

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
        .finally(() => {
            setLoading(false);
        });
    }

    return (
        <div className="w-11/12 m-auto my-10 border-2 border-blue-500 p-5 rounded-lg shadow-2xl shadow-blue-200">
            <h1 className="text-center text-xl font-semibold">Edit Data</h1>
            {dataDetail === null && <p>Data Kosong</p>}
            {dataDetail === undefined && <p>Loading...</p>}
            {dataDetail && 
                (
                    <form onSubmit={handleSumbit} className="mt-5">
                        <div className="flex items-center gap-2">
                            <div className="w-1/4 flex flex-col border-2 border-black rounded p-2">
                                <label>Nama: </label>
                                <input className="border-2 border-black rounded px-4 w-full" name="id_karyawan" required defaultValue={dataDetail.id_karyawan}></input>
                            </div>
                            <div className="w-1/4 flex flex-col border-2 border-black rounded p-2">
                                <label>Jam datang: </label>
                                <input className="border-2 border-black rounded px-4" name="jam_datang" type="text" defaultValue={dataDetail.jam_datang}/>
                            </div>
                            <div className="w-1/4 flex flex-col border-2 border-black rounded p-2">
                                <label>Jam pulang: </label>
                                <input className="border-2 border-black rounded px-4" name="jam_pulang" type="text" defaultValue={dataDetail.jam_pulang}/>
                            </div>
                            <div className="w-1/4 flex flex-col border-2 border-black rounded p-2">
                                <label>Tanggal: </label>
                                <div className="flex">
                                    <input className="border-2 border-black rounded px-4 w-1/3" name="hari" required placeholder="Hari" defaultValue={dataDetail.hari}></input>
                                    <input className="border-2 border-black rounded px-4 w-1/3" name="bulan" required placeholder="Bulan" defaultValue={dataDetail.bulan}></input>
                                    <input className="border-2 border-black rounded px-4 w-1/3" name="tahun" required placeholder="Tahun" defaultValue={dataDetail.tahun}></input>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 mb-2 items-center flex justify-center gap-2">
                            <button className="bg-blue-500 border-2 border-blue-500 text-white py-1 px-4 font-semibold rounded-full" type="submit" disabled={loading}>{loading ? 'Loading...' : 'Simpan'}</button>
                            <Link className="border-blue-500 border-2 bg-transparent text-blue-500 py-1 px-4 font-semibold rounded-full" href={`/admin`}>Kembali</Link>
                        </div>
                    </form>
                )
            }
        </div>
    )
}