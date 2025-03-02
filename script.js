document.addEventListener("DOMContentLoaded", () => {
    const monsContainer = document.getElementById("mons-container");
    const searchInput = document.getElementById("search");

    async function fetchMons() {
        try {
            const response = await fetch("pokemon/index.json"); // Fetch the list of JSON files in the folder
            const fileNames = await response.json(); // Assuming the server returns a JSON array of filenames
            
            const mons = await Promise.all(
                fileNames.map(async (fileName) => {
                    const res = await fetch(`pokemon/${fileName}`);
                    return res.json();
                })
            );

            displayMons(mons);
        } catch (error) {
            console.error("Error loading Pokémon data:", error);
        }
    }

    fetchMons();

    function displayMons(mons) {
        monsContainer.innerHTML = "";
        mons.forEach(mon => {
            const monCard = document.createElement("div");
            monCard.classList.add("mon-card");
            
            let movesList = `<div class='move-grid' style='display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; text-align: left;'>${mon.moves.map(m => `
                <div class='move-item' style='padding: 5px; border-radius: 5px; background: #f1f1f1; text-align: center;'>
                    <span class='move-name' style='font-weight: bold;'>${m.name}</span>
                    <small class='move-method' style='display: block; color: gray;'>(${m.method})</small>
                </div>`).join("")}</div>`;
            
                let spawnInfo = mon.spawn_data ? 
                `<div class='spawn-data' style="display: grid; grid-template-columns: auto auto; gap: 5px; text-align: left;">
                    <div><strong>Biome:</strong> ${mon.spawn_data.biome}</div>
                    <div><strong>Time:</strong> ${mon.spawn_data.time}</div>
                    <div><strong>Rarity:</strong> ${mon.spawn_data.rarity}</div>
                </div>` 
                : "N/A";
            let evolutionInfo = mon.evolves_from ? `Evolves from: ${mon.evolves_from}` : "Base form";
            let formInfo = mon.form ? mon.form : "Standard";
            
            let typeIcons = mon.types.map(type => `
                <span class='type-label' style="
                    background: linear-gradient(105deg, var(--${type.toLowerCase()}-color, #AAA) 30px, #5A5A5A 31px, #5A5A5A);
                    padding: 4px 8px;
                    margin: 3px;
                    border-radius: 15px;
                    display: inline-flex;
                    align-items: center;
                    white-space: nowrap;">
                    <img src='type/30px-${type}_icon.png' alt='${type}' class='type-icon' style='width: 20px; height: 20px; margin-left: -3px; margin-right: 5px;'>
                    <span class='type-text' style='color: #FFF; min-width: 50px; text-align: center;'>${type}</span>
                </span>
            `).join(" ");
            
            monCard.innerHTML = `
                <h2 style='margin-bottom: 5px;'>${mon.name}<br><span style='font-size: 18px; font-weight: bold;'>${formInfo}</span></h2>
                <div class='type-section' style='text-align: center; margin: 10px 0;'>${typeIcons}</div>
                <p><strong>${evolutionInfo}</strong></p>
                <hr>
                ${createCollapsibleSection("Abilities", `<div class='ability-list' style='text-align: left;'>${mon.abilities.map(a => {
                    if (a.includes("(Hidden)")) {
                        return `<div class='ability-item' style='font-weight: bold;'>${a.replace(" (Hidden)", "")}</div>`;
                    }
                    return `<div class='ability-item'>${a}</div>`;
                }).join("")}</div>`)}
                <hr>
                ${createCollapsibleSection("Moves", `<div class='move-list' style='text-align: left;'>${movesList}</div>`)}
                <hr>
                ${createCollapsibleSection("Stats", `
                    ${createStatRow("HP", mon.stats.hp, "#78C850")}
                    ${createStatRow("Attack", mon.stats.atk, "#F08030")}
                    ${createStatRow("Defense", mon.stats.def, "#F8D030")}
                    ${createStatRow("Sp. Atk", mon.stats.spa, "#6890F0")}
                    ${createStatRow("Sp. Def", mon.stats.spd, "#98D8D8")}
                    ${createStatRow("Speed", mon.stats.spe, "#C03028")}`)}
                <hr>
                ${createCollapsibleSection("Spawn Data", `<div class='spawn-data' style='text-align: left;'>${spawnInfo}</div>`)}
            `;
            monsContainer.appendChild(monCard);
        });

        document.querySelectorAll(".collapsible-header").forEach(header => {
            header.addEventListener("click", function () {
                const content = this.nextElementSibling;
                content.style.display = content.style.display === "none" ? "block" : "none";
            });
        });
    }

    function createCollapsibleSection(title, content) {
        return `
            <div class="collapsible">
                <div class="collapsible-header" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-weight: bold; padding: 5px; background: #f1f1f1; border-radius: 5px;">
                    <span>${title}</span>
                    <span class="toggle-arrow">▼</span>
                </div>
                <div class="collapsible-content" style="padding: 10px; display: none;">${content}</div>
            </div>
        `;
    }

    function createStatRow(label, value, color) {
        let width = Math.max(10, (value / 255) * 100);
        return `
            <div style="display: flex; align-items: center; margin-bottom: 5px;">
                <span style="width: 80px; font-size: 14px; font-weight: bold;">${label}</span>
                <div style="flex-grow: 1; height: 16px; background: #eee; border-radius: 4px; overflow: hidden; position: relative; max-width: 250px;">
                    <div style="width: ${width}%; height: 100%; background: ${color};"></div>
                </div>
                <span style="width: 40px; font-size: 14px; text-align: left; margin-left:10px">${value}</span>
            </div>
        `;
    }

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        document.querySelectorAll(".mon-card").forEach(card => {
            const name = card.querySelector("h2").innerText.toLowerCase();
            card.style.display = name.includes(searchTerm) ? "block" : "none";
        });
    });




});