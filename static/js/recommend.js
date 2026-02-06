document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("recommend-form");
    const bestCard = document.getElementById("best-crop-card");
    const otherCard = document.getElementById("other-crops-card");
    const messageEl = document.getElementById("recommend-message");
    const otherBody = document.getElementById("other-crops-body");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        messageEl.textContent = "Calculating best crop based on ROI...";
        bestCard.classList.add("hidden");
        otherCard.classList.add("hidden");
        otherBody.innerHTML = "";

        const payload = {
            soil_type: document.getElementById("soil-type").value,
            season: document.getElementById("season").value,
            rainfall: parseFloat(document.getElementById("rainfall").value),
            temperature: parseFloat(document.getElementById("temperature").value),
            user: typeof getCurrentUser === "function" ? getCurrentUser() : "guest",
        };

        try {
            const res = await fetch("/api/recommend_crop", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error("Server error");
            const data = await res.json();

            if (!data.best_crop) {
                messageEl.textContent = "No suitable crops could be found. Please adjust your inputs.";
                return;
            }

            const best = data.best_crop;
            document.getElementById("best-crop-name").textContent = best.crop;
            document.getElementById("best-crop-profit").textContent = best.profit.toFixed(0) + " per acre";
            document.getElementById("best-crop-yield").textContent = best.yield_per_acre;
            document.getElementById("best-crop-price").textContent = best.price_per_ton;
            document.getElementById("best-crop-cost").textContent = best.cost_per_acre;
            bestCard.classList.remove("hidden");

            (data.other_crops || []).forEach((c) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${c.crop}</td>
                    <td>₹${c.profit.toFixed(0)}</td>
                    <td>${c.yield_per_acre}</td>
                    <td>₹${c.price_per_ton}</td>
                    <td>₹${c.cost_per_acre}</td>
                `;
                otherBody.appendChild(tr);
            });
            if ((data.other_crops || []).length) {
                otherCard.classList.remove("hidden");
            }

            messageEl.textContent = "Crops are ranked by profit = (yield × price) − cost per acre.";
        } catch (err) {
            console.error(err);
            messageEl.textContent = "Could not get recommendation. Please check your connection.";
        }
    });
});

