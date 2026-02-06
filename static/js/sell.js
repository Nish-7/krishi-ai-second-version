document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("sell-form");
    const listEl = document.getElementById("sell-listings");

    async function refreshFromServer() {
        try {
            // Hit list endpoint with an empty listing to just get current list is not ideal.
            // Instead we rely on last response; this is a simple prototype view.
        } catch (err) {
            console.error(err);
        }
    }

    function renderListings(listings) {
        listEl.innerHTML = "";
        if (!listings.length) {
            listEl.textContent = "No listings yet. Add your first crop.";
            return;
        }
        listings.forEach((l) => {
            const item = document.createElement("div");
            item.className = "listing-item";
            item.innerHTML = `
                <div><strong>${l.crop_name}</strong> - ${l.quantity} q at ₹${l.price}/q</div>
                <div class="listing-meta">By: ${l.user}</div>
            `;
            listEl.appendChild(item);
        });
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const payload = {
            user: typeof getCurrentUser === "function" ? getCurrentUser() : "guest",
            crop_name: document.getElementById("sell-crop-name").value,
            quantity: parseFloat(document.getElementById("sell-quantity").value),
            price: parseFloat(document.getElementById("sell-price").value),
        };

        try {
            const res = await fetch("/api/list_crop", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (res.ok && data.listings) {
                renderListings(data.listings);
                form.reset();
            }
        } catch (err) {
            console.error(err);
            alert("Could not save listing. Check your connection.");
        }
    });

    // Start with empty state
    renderListings([]);
    refreshFromServer();
});

