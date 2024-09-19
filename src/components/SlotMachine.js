import React, { useState, useEffect } from "react";
import Slot from "./Slot";
import "./SlotMachine.css"; // Import CSS

const SlotMachine = () => {
  const [slots, setSlots] = useState(Array(9).fill("🍒")); // Grid 3x3
  const [result, setResult] = useState("");
  const [winChance, setWinChance] = useState(10); // Default chance
  const [scatterChance, setScatterChance] = useState(0); // Default scatter
  const [spinCount, setSpinCount] = useState(0); // Hitungan spin
  const [balance, setBalance] = useState(100000); // Saldo awal
  const [betAmount, setBetAmount] = useState(1000); // Taruhan default
  const [winAmount, setWinAmount] = useState(5000); // Default win amount
  const [multiplier, setMultiplier] = useState(1); // Default multiplier

  useEffect(() => {
    // Mendapatkan pengaturan dari localStorage
    const savedWinChance = localStorage.getItem("winChance");
    const savedScatterChance = localStorage.getItem("scatterChance");
    const savedWinAmount = localStorage.getItem("winAmount");
    const savedMultiplier = localStorage.getItem("multiplier");

    if (savedWinChance) setWinChance(parseInt(savedWinChance, 10));
    if (savedScatterChance) setScatterChance(parseInt(savedScatterChance, 10));
    if (savedWinAmount) setWinAmount(parseInt(savedWinAmount, 10));
    if (savedMultiplier) setMultiplier(parseInt(savedMultiplier, 10));
  }, []);

  const symbols = ["🍒", "🍋", "🍉", "🍇", "🍊", "🍍", "🔔", "💎", "⭐"]; // Simbol slot

  const randomSymbol = () => {
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const spinSlots = () => {
    if (balance < betAmount) {
      setResult("Saldo tidak cukup. Silakan top-up.");
      return;
    }

    setSpinCount(spinCount + 1);

    const newSlots = slots.map(() => randomSymbol());
    setSlots(newSlots);

    setBalance(balance - betAmount); // Kurangi saldo dengan taruhan

    // Cek apakah scatter muncul
    if (scatterChance > 0 && spinCount % scatterChance === 0) {
      const scatterWin = winAmount * multiplier;
      setResult(
        `Scatter! Anda menang Rp${scatterWin.toLocaleString()} dengan perkalian ${multiplier}x`
      );
      setBalance(balance + scatterWin); // Kemenangan dari scatter
    } else if (checkWin(newSlots)) {
      setResult(`Anda menang Rp${winAmount.toLocaleString()}`);
      setBalance(balance + winAmount);
    } else {
      setResult("Coba lagi!");
    }
  };

  const checkWin = (slots) => {
    // Cek baris kemenangan
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (slots[a] === slots[b] && slots[b] === slots[c]) {
        return true; // Kemenangan jika 3 simbol sama
      }
    }

    return false;
  };

  const handleTopUp = (amount) => {
    setBalance(balance + amount);
    alert(`Anda berhasil melakukan top-up Rp${amount.toLocaleString()}`);
  };

  return (
    <div className="slot-container">
      <h1>Game orang kaya</h1>
      <div className="balance">Saldo: Rp{balance.toLocaleString()}</div>
      <div className="balance">Taruhan: Rp{betAmount.toLocaleString()}</div>
      <div className="slot-grid">
        {slots.map((slot, index) => (
          <Slot key={index} symbol={slot} />
        ))}
      </div>
      <button onClick={spinSlots}>Spin</button>
      <div>{result}</div>
      <div className="topup-buttons">
        <h3>Top Up Saldo</h3>
        <button onClick={() => handleTopUp(50000)}>Top Up Rp50,000</button>
        <button onClick={() => handleTopUp(100000)}>Top Up Rp100,000</button>
      </div>
    </div>
  );
};

export default SlotMachine;
