import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const handleAdd = (event) => {
    event.preventDefault();
    setLoading(true)

    const id_karyawan = event.target.id_karyawan.value;
    const jam_datang = event.target.jam_datang.value;
    const keterangan = event.target.keterangan.value;

    fetch("/api/insertData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_karyawan: id_karyawan,
        jam_datang: jam_datang,
        keterangan:keterangan
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        router.push("/");
      })
      .catch((err) => {
        alert("hubungi saya", err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-5/12 m-auto my-10 border-2 border-blue-500 p-5 rounded-lg shadow-2xl shadow-blue-200">
      <h1 className="text-center text-xl font-semibold my-2 mb-3">Kehadiran</h1>
        <form onSubmit={handleAdd}>
          <div className="flex items-center justify-between w-11/12 m-auto">
            <div style={{ padding:"10px 0" }} className="flex items-center gap-2">
              <label style={{ padding:"0 5px" }}>Nama:</label>
              <input
                className="border-2 border-blue-500 rounded-lg px-2 w-full"
                name="id_karyawan"
                required
              />
            </div>
            <div style={{ padding:"10px 0" }}>
              <label style={{ padding:"0 5px" }}>Jam datang:</label>
              <input
                className="border-2 border-blue-500 rounded-lg px-2 w-16 text-center"
                name="jam_datang"
                defaultValue={(new Date()).getHours() + ":" + String((new Date()).getMinutes()).padStart(2,"0")}
              />
            </div>
          </div>
          <div style={{ padding:"10px 0" }} className="w-11/12 m-auto flex items-center gap-2">
            <label style={{ padding:"0 5px" }}>Keterangan:</label>
            <input
              className="border-2 border-blue-500 rounded-lg px-2 w-full"
              name="keterangan"
              required
            />
          </div>
          <div className="flex gap-2 justify-center items-center mt-4" style={{ padding:"10px 0" }}>
            <button
              className="border-blue-500 bg-blue-500 border-2 text-white py-1 px-4 font-semibold rounded-full"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Hadir'}
            </button>
            <button className="border-red-500 border-2 bg-transparent text-red-500 py-1 px-4 font-semibold rounded-full" type="button" onClick={() => {router.push(`/`);}}>Kembali</button>
          </div>
        </form>
    </div>
  );
}