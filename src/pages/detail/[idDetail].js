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
        <div>
            <p>Detail</p>
            <span>{idDetail}</span>
            {dataDetail === null && <p>Data Kosong</p>}
            {dataDetail === undefined && <p>Loading....</p>}
            {dataDetail && dataDetail.map((data,index) => {
                return (
                    <div key={index}>
                        {data.id_karyawan}
                        {" "}
                        {data.jam_datang}
                        {" "}
                        {data.jam_pulang}
                        {" "}
                        {data.keterangan}
                        {" "}
                        {data.hari}
                        {"/"}
                        {data.bulan}
                        {"/"}
                        {data.tahun}
                    </div>
                )
            })}
            <Link href={`/admin`}>Kembali</Link>
        </div>
    )
}