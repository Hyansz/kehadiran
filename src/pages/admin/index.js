
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
        <div className="w-11/12 m-auto my-10 border-2 border-blue-500 p-5 rounded-lg shadow-2xl shadow-blue-200">
            <h1 className="text-center text-xl font-semibold">Portal Admin</h1>
            {showAllData === undefined && <h1>Loading....</h1>}
            {showAllData && showAllData.length === 0 && <h1 className="text-center m-7">Data Kosong</h1>}
            {showAllData && showAllData.map((data,index) => {
                return (
                    <div key={index} className="flex lg:flex-row flex-col justify-between my-2 lg:items-center">
                        <div>
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
                        </div>
                        <div className="flex gap-2">
                            <button 
                                className="border-blue-500 border-2 bg-transparent text-blue-500 py-1 px-4 font-semibold rounded-full"
                                onClick={() => {
                                    router.push(`/detail/${data.id}`)
                                }}>Detail</button>
                            {" "}
                            <button 
                                className="border-orange-500 border-2 bg-transparent text-orange-500 py-1 px-4 font-semibold rounded-full"
                                onClick={() => {
                                    router.push(`/edit/${data.id}`)
                                }}>Edit</button>
                            {" "}
                            <button 
                                className="border-red-500 border-2 bg-transparent text-red-500 py-1 px-4 font-semibold rounded-full"
                                onClick={() => {
                                    if(confirm("Yakin untuk dihapus ?")) {
                                        handleDelete(data.id)
                                    }
                                }}>Delete
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}