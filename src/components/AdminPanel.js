import React, { useState } from "react";
import "./AdminPanel.css"; // Import CSS

const AdminPanel = () => {
  const [winChance, setWinChance] = useState(10); // Peluang menang biasa
  const [scatterChance, setScatterChance] = useState(5); // Scatter muncul di spin ke berapa
  const [winAmount, setWinAmount] = useState(750000); // Jumlah kemenangan dalam Rupiah
  const [multiplier, setMultiplier] = useState(5); // Multiplier untuk scatter

  const handleSubmit = (e) => {
    e.preventDefault();
    if (winChance < 0 || winChance > 100) {
      alert("Masukkan peluang menang antara 0 dan 100.");
      return;
    }
    if (scatterChance < 1) {
      alert("Masukkan scatter spin yang valid.");
      return;
    }
    if (winAmount <= 0 || multiplier <= 0) {
      alert("Masukkan jumlah kemenangan dan multiplier yang valid.");
      return;
    }

    localStorage.setItem("winChance", winChance);
    localStorage.setItem("scatterChance", scatterChance);
    localStorage.setItem("winAmount", winAmount);
    localStorage.setItem("multiplier", multiplier);
    alert("Pengaturan berhasil diperbarui!");
  };

  return (
    <div className="admin-container">
      <h1>Panel Admin</h1>
      <form onSubmit={handleSubmit}>
        <label>Peluang Menang (%):</label>
        <input
          type="number"
          value={winChance}
          onChange={(e) => setWinChance(parseInt(e.target.value))}
          min="0"
          max="100"
        />
        <br />

        <label>Spin ke- berapa Scatter muncul:</label>
        <input
          type="number"
          value={scatterChance}
          onChange={(e) => setScatterChance(parseInt(e.target.value))}
          min="1"
        />
        <br />

        <label>Jumlah Kemenangan (Rp):</label>
        <input
          type="number"
          value={winAmount}
          onChange={(e) => setWinAmount(parseInt(e.target.value))}
          min="1"
        />
        <br />

        <label>Multiplier Scatter (x):</label>
        <input
          type="number"
          value={multiplier}
          onChange={(e) => setMultiplier(parseInt(e.target.value))}
          min="1"
        />
        <br />

        <button type="submit">Simpan Pengaturan</button>
      </form>
    </div>
  );
};

export default AdminPanel;
