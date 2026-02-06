document.addEventListener("DOMContentLoaded", () => {
    const nameEl = document.getElementById("profile-name");
    const villageEl = document.getElementById("profile-village");
    const districtEl = document.getElementById("profile-district");
    const stateEl = document.getElementById("profile-state");
    const recContainer = document.getElementById("profile-recommendations");
    const listContainer = document.getElementById("profile-listings");
    const msg = document.getElementById("profile-message");

    async function loadProfile() {
        const user = typeof getCurrentUser === "function" ? getCurrentUser() : "guest";
        msg.textContent = "Loading profile...";
        try {
            const res = await fetch(`/api/profile?user=${encodeURIComponent(user)}`);
            if (!res.ok) throw new Error("Server error");
            const data = await res.json();

            nameEl.textContent = data.name;
            villageEl.textContent = data.village;
            districtEl.textContent = data.district;
            stateEl.textContent = data.state;

            recContainer.innerHTML = "";
            (data.recommendations || []).forEach((r, idx) => {
                const el = document.createElement("div");
                el.className = "history-item";
                const bestName = r.result?.best_crop?.crop || "Unknown";
                const profit = r.result?.best_crop?.profit;
                el.innerHTML = `
                    <div class="history-item-title">Recommendation #${idx + 1}: ${bestName}</div>
                    <div>Profit used: ₹${profit != null ? profit.toFixed(0) : "N/A"} per acre</div>
                `;
                recContainer.appendChild(el);
            });

            listContainer.innerHTML = "";
            (data.listings || []).forEach((l, idx) => {
                const el = document.createElement("div");
                el.className = "history-item";
                el.innerHTML = `
                    <div class="history-item-title">Listing #${idx + 1}: ${l.crop_name}</div>
                    <div>${l.quantity} q at ₹${l.price}/q</div>
                `;
                listContainer.appendChild(el);
            });

            if (!(data.recommendations || []).length && !(data.listings || []).length) {
                msg.textContent = "No history yet. Use crop recommendation and sell crops tools to build your profile.";
            } else {
                msg.textContent = "";
            }
        } catch (err) {
            console.error(err);
            msg.textContent = "Could not load profile. Please check your connection.";
        }
    }

    loadProfile();
});

