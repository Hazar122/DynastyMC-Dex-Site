# 🏆 DynastyMC Dex Site

Welcome to the **DynastyMC Dex Site**, your resource for exploring the unique Pokémon forms and fakemon available on DynastyMC!

## 🌐 Getting Started

Visit the live site here:  
🔗 [DynastyMC Dex Site](https://hazar122.github.io/DynastyMC-Dex-Site/)

## 📖 How to Use

### 1️⃣ Writing a Pokémon JSON

Each Pokémon entry follows this structured JSON format (example can be found in tools/pokemon_template.json):
```
{
    "name": "ExampleMon",
    "form": "",
    "types": ["Fire", "Flying"],
    "evolves_from": "",
    "evolves_to": "",
    "abilities": ["Blaze", "Flash Fire (Hidden)"],
    "stats": {
        "hp": 80,
        "atk": 90,
        "def": 75,
        "spa": 110,
        "spd": 85,
        "spe": 95
    },
    "moves": [
        {"name": "Flamethrower", "method": "Level 1"},
        {"name": "Heat Wave", "method": "Level 50"}
    ],
    "spawn_data": [
        "Found in volcanic areas during the day.",
        "Rarely appears near lava pools."
    ]
}
```

🔹 **Field Descriptions:**
- **`name`** → Pokémon name  
- **`form`** → Special form (leave empty if standard)  
- **`types`** → List of types  
- **`evolves_from`** / **`evolves_to`** → Evolution chain  
- **`abilities`** → List of abilities (Hidden Ability included if applicable)  
- **`stats`** → Base stats (HP, Attack, Defense, etc.)  
- **`moves`** → List of moves with their learning method  
- **`spawn_data`** → A list of sentences describing where it spawns  

---

### 2️⃣ Adding a Pokémon to `index.json`

Once your Pokémon JSON file is created, **add its filename** to `pokemon/index.json` to make it available on the site.

#### **Example `index.json` file:**
```
[
    "ExampleMon.json",
    "AnotherMon.json",
    "LegendaryMon.json"
]
```
> [!WARNING]
> Ensure that filenames are **exact** and placed inside the `pokemon/` directory.

---

### 3️⃣ Using the `moveformatter.py` Script

The **move formatter script** automates the conversion of raw movesets into JSON format.

#### **💻 How to Run the Script:**
1. **Open a terminal** in the script’s directory.
2. Run the script inside tools/:
   >python moveformatter.py
3. **Paste your moveset** using this format:
   > "1:ember", "5:flamethrower", "10:fireblast", "100:heatwave"
4. Press **Enter** to finalize the input.
5. The script will generate a structured **`movesFormatted.json`** file in tools/.

Copy this JSON output into your Pokémon entry under the `"moves"` section.

---

## ✍ Suggesting Additions & Changes

We welcome contributions! If you'd like to add new Pokémon, suggest changes, or report issues:

1. **Open an Issue** on our [GitHub Repository](https://github.com/Hazar122/DynastyMC-Dex-Site/issues).
2. **Fork the repository**, make changes, and submit a **Pull Request (PR)**.
3. Contact me via **Discord**

---

## 👤 Authors

Currently maintained by **me**.

---

## 🔥 Next Steps & Improvements

- 📝 Add more Pokémon entries  
- 🗂 Keep `index.json` updated  
- ⚡ Use `moveformatter.py` for faster move formatting  
- 🎨 Improve the website’s styling & functionality  

---

Thank you for contributing to DynastyMC Dex Site! 🚀
