import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleAdd = (event) => {
    event.preventDefault();
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
      });
  };

  return (
    <div>
      <h1>Absensi</h1>
     <form onSubmit={handleAdd}>
          <div style={{ padding:"10px 0" }}>
            <label style={{ padding:"0 5px" }}>Nama:</label>
            <input
              name="id_karyawan"
              required
            />
          </div>
          <div style={{ padding:"10px 0" }}>
            <label style={{ padding:"0 5px" }}>Jam datang:</label>
            <input
              name="jam_datang"
              defaultValue={(new Date()).getHours() + ":" + String((new Date()).getMinutes()).padStart(2,"0")}
            />
          </div>
          <div style={{ padding:"10px 0" }}>
            <label style={{ padding:"0 5px" }}>Keterangan:</label>
            <input
              name="keterangan"
              required
            />
          </div>
          <div className="flex gap-1" style={{ padding:"10px 0" }}>
            <button
              type="submit"
            >
              Add Data
            </button>
            <button type="button" onClick={() => {router.push(`/`);}}>Kembali</button>
          </div>
        </form>
    </div>
  );
}