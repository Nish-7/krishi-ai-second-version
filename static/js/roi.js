document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("roi-form");
    const card = document.getElementById("roi-result-card");
    const msg = document.getElementById("roi-message");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        msg.textContent = "Calculating ROI...";
        card.classList.add("hidden");

        const payload = {
            crop: document.getElementById("roi-crop").value,
            area: parseFloat(document.getElementById("roi-area").value),
            cost: parseFloat(document.getElementById("roi-cost").value || "0"),
        };

        try {
            const res = await fetch("/api/calculate_roi", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) {
                msg.textContent = data.error || "Could not calculate ROI.";
                return;
            }

            document.getElementById("roi-crop-name").textContent = data.crop;
            document.getElementById("roi-area-used").textContent = data.area;
            document.getElementById("roi-yield").textContent = data.yield_per_acre;
            document.getElementById("roi-price").textContent = data.price_per_ton;
            document.getElementById("roi-cost-used").textContent = data.total_cost_used.toFixed(0);
            document.getElementById("roi-profit").textContent = data.profit.toFixed(0);
            card.classList.remove("hidden");
            msg.textContent = "ROI uses profit = (yield × area × price) − cost.";
        } catch (err) {
            console.error(err);
            msg.textContent = "Could not reach server. Please try again.";
        }
    });
});

