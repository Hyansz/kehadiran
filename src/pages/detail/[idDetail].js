import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function DetailPage() {
    const router = useRouter()
    const {idDetail} = router.query
    const [dataDetail,setDataDetail] = useState()

    useEffect(() => {
        fetch(`/api/getDataDetail?id=${idDetail}`)
        .then((res) => res.json())
        .then((data) => {
            setDataDetail(data.data)
        })
        .catch((err) => {
            alert("eror", err.message)
        })
    },[idDetail])

    return (
        <div className="w-3/12 m-auto my-10 border-2 border-blue-500 p-5 rounded-lg text-center pb-9 shadow-2xl shadow-blue-200">
            {dataDetail !== undefined && <p className="text-center text-xl font-semibold mt-3 mb-10">Detail: {idDetail}</p>}
            {dataDetail === undefined && <p className="mb-6">Loading....</p>}
            {dataDetail && dataDetail.length === 0 && <h1 className="text-center m-7">Data Kosong</h1>}
            {dataDetail && dataDetail.map((data,index) => {
                return (
                    <div key={index} className="mb-10 leading-8 text-justify">
                        <span>Nama: {data.id_karyawan}</span>
                        {" "}
                        <br/>
                        <span>Jam Datang: {data.jam_datang}</span>
                        {" "}
                        <br/>
                        <span>Jam Pulang: {data.jam_pulang}</span>
                        {" "}
                        <br/>
                        <span>Keterangan: {data.keterangan}</span>
                        {" "}
                        <br/>
                        <span>
                            Login Pada: {data.hari}
                            {"/"}
                            {data.bulan}
                            {"/"}
                            {data.tahun}
                        </span>
                    </div>
                )
            })}
            <Link href={`/admin`} className="border-red-500 border-2 bg-transparent text-red-500 py-1 px-4 font-semibold rounded-full">Kembali</Link>
        </div>
    )
}