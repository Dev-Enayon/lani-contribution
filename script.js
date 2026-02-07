
  // Elements
  const todayEl = document.getElementById("today");
  const redrawStatusEl = document.getElementById("redrawStatus");
  const countdownEl = document.getElementById("countdown");

  function getLastDayOfMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function formatDate(date) {
    return date.toLocaleDateString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  function updateDateAndCountdown() {
    const now = new Date();

    // ---- Update Today ----
    todayEl.textContent = formatDate(now);

    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();

    const redrawStart = 27;
    const redrawEnd = getLastDayOfMonth(year, month);

    let targetTime;
    let redrawOpen = false;

    // ---- Redraw logic ----
    if (day < redrawStart) {
      redrawStatusEl.textContent = `Redraw opens on the 27th`;
      redrawStatusEl.style.color = "#555";
      targetTime = new Date(year, month, redrawStart, 0, 0, 0);
    } else if (day >= redrawStart && day <= redrawEnd) {
      redrawOpen = true;
      redrawStatusEl.textContent = `Redraw OPEN (Day ${day} of ${redrawEnd})`;
      redrawStatusEl.style.color = "green";
      targetTime = new Date(year, month, redrawEnd, 23, 59, 59);
    } else {
      redrawStatusEl.textContent = "Redraw CLOSED";
      redrawStatusEl.style.color = "red";
      countdownEl.textContent = "No redraw available";
      return;
    }

    // ---- Countdown ----
    const diff = targetTime - now;

    if (diff <= 0) {
      countdownEl.textContent = "Time expired";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownEl.textContent =
      `Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  // Initial load
  updateDateAndCountdown();

  // Update every second
  setInterval(updateDateAndCountdown, 1000);

