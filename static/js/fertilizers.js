document.addEventListener("DOMContentLoaded", async () => {
    const body = document.getElementById("fertilizer-body");
    const msg = document.getElementById("fertilizer-message");

    async function loadFertilizers() {
        msg.textContent = "Loading fertilizers...";
        body.innerHTML = "";
        try {
            const res = await fetch("/api/fertilizers");
            if (!res.ok) throw new Error("Server error");
            const data = await res.json();
            data.forEach((f) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${f.name}</td>
                    <td>${f.type}</td>
                    <td>${f.toxicity}</td>
                    <td>₹${f.price_per_kg}</td>
                `;
                body.appendChild(tr);
            });
            msg.textContent = "This data is cached for offline viewing once loaded.";
        } catch (err) {
            console.error(err);
            msg.textContent = "Could not load fertilizers. If you visited this page before, try again while offline to use cached data.";
        }
    }

    loadFertilizers();
});

