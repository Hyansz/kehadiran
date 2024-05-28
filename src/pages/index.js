import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter()
  const [showAllData,setShowAllData] = useState()

  useEffect(() => {
    fetch(`/api/getDataToday`)
    .then((res) => res.json())
    .then((data) => {
      let sortById = data.data
      sortById = sortById.sort((a,b) => a.id - b.id)
      setShowAllData(sortById)
    })
  },[])

  const handleUpdate = (id) => {
    fetch(`/api/updateData?id=${id}`, {
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        jam_pulang: (new Date()).getHours() + ":" + String((new Date()).getMinutes()).padStart(2,"0")
      })
    })
    .then((res) =>  res.json())
    .then((data) => {
      console.log(data.data)
      alert("Terimakasih atas partisipasi Anda")
      router.reload()
    })
    .catch((err) => {
      alert("Eror ", err.message)
    })
  }

  return (
    <div className="w-11/12 m-auto my-10 border-2 border-blue-500 p-5 rounded-lg shadow-2xl shadow-blue-200">
      <h1 className="text-center text-xl font-semibold">Kehadiran Karyawan</h1>
      <button 
        className="bg-blue-500 py-2 px-4 font-semibold text-white rounded-full shadow-xl shadow-blue-200 my-4"
        onClick={() => {
          router.push(`/add-data`)
        }}>Tambah Absensi</button>
      <div>
        {showAllData && showAllData.length === 0 && <h1 className="my-7">Data Kosong</h1>}
        {showAllData === undefined && <h1>Loading....</h1>}
        {showAllData && showAllData.map((data,index) => {
          return (
            <div key={index} style={{ margin:"10px 0" }}>
              {data.id}
              {". "}
              {data.id_karyawan}
              {" "}
              {data.jam_datang}
              {" "}
              {data.jam_pulang}
              {" "}
              {!data.jam_pulang && (
                  <button 
                    className="border-blue-500 border-2 bg-transparent text-blue-500 py-1 px-4 font-semibold rounded-full"
                    onClick={() => {
                      handleUpdate(data.id)
                    }}>Pulang</button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
}
