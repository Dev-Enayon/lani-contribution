  const todayEl = document.getElementById("today");
  const redrawStatusEl = document.getElementById("redrawStatus");
  const countdownEl = document.getElementById("countdown");

  const amountInput = document.getElementById("amountInput");
  const contributeBtn = document.getElementById("contributeBtn");

  const balanceEl = document.getElementById("balance");
  const totalEl = document.getElementById("total");
  const streakEl = document.getElementById("streak");
  const historyTable = document.getElementById("historyTable");

  let balance = 0;
  let total = 0;
  let streak = 0;

  function formatNaira(amount) {
    return "₦" + amount.toLocaleString();
  }

  function formatDate(date) {
    return date.toISOString().split("T")[0];
  }

  function lastDayOfMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function updateDateAndRedraw() {
    const now = new Date();
    todayEl.textContent = now.toDateString();

    const day = now.getDate();
    const end = lastDayOfMonth(now.getFullYear(), now.getMonth());

    if (day >= 27 && day <= end) {
      redrawStatusEl.textContent = "Redraw OPEN";
      redrawStatusEl.style.color = "green";
      contributeBtn.disabled = false;
      contributeBtn.style.opacity = "1";
    } else {
      redrawStatusEl.textContent = "Redraw CLOSED";
      redrawStatusEl.style.color = "red";
      contributeBtn.disabled = true;
      contributeBtn.style.opacity = "0.5";
    }
  }

  contributeBtn.addEventListener("click", () => {
    const amount = Number(amountInput.value);

    if (!amount || amount <= 0) {
      alert("Enter a valid amount");
      return;
    }

    balance += amount;
    total += amount;
    streak += 1;

    balanceEl.textContent = formatNaira(balance);
    totalEl.textContent = formatNaira(total);
    streakEl.textContent = streak;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${formatDate(new Date())}</td>
      <td>${formatNaira(amount)}</td>
      <td>✅</td>
    `;

    historyTable.prepend(row);
    amountInput.value = "";
  });

  updateDateAndRedraw();
