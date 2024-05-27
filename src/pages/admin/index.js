
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Admin() {
    const [showAllData,setShowAllData] = useState()
    const router = useRouter()

    useEffect(() => {
        fetch(`/api/getData`)
        .then((res) => res.json())
        .then((data) => {
            let sortById = data.data
            sortById = sortById.sort((a,b) => a.id - b.id)
            setShowAllData(sortById)
        })
        .catch((err) => {
            alert("Eror ", err.message)
        })
    }, [])

    const handleDelete = (id) => {
        fetch(`/api/delData?id=${id}`, {
            method:"DELETE"
        })
        .then((res) => res.json())
        .then(() => {
            router.reload()
        })
        .catch((err) => {
            alert("eror ", err.message)
        })
    }

    return(
        <div style={{ fontFamily:"monospace" }}>
            <h1>Portal Admin</h1>
            {showAllData === null && <h1>Data Kosong</h1>}
            {showAllData === undefined && <h1>Loading....</h1>}
            {showAllData && showAllData.map((data,index) => {
                return (
                    <div key={index}>
                        {data.id}
                        {".  "}
                        {data.id_karyawan}
                        {" "}
                        {data.jam_datang}
                        {" "}
                        {data.jam_pulang}
                        {" - "}
                        {data.hari}
                        {"/"}
                        {data.bulan}
                        {"/"}
                        {data.tahun}
                        {" "}
                        <button onClick={() => {
                            router.push(`/detail/${data.id}`)
                        }}>Detail</button>
                        {" "}
                        <button onClick={() => {
                            router.push(`/edit/${data.id}`)
                        }}>Edit</button>
                        {" "}
                        <button onClick={() => {
                            if(confirm("Yakin untuk dihapus ?")) {
                                handleDelete(data.id)
                            }
                        }}>Delete</button>
                    </div>
                )
            })}
        </div>
    )
}