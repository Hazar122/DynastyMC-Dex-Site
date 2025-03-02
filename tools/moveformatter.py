import json
import os

def format_moveset(moveset):
    formatted_moves = []
    for move in moveset:
        move = move.strip().strip('"')  # Remove extra quotes if present
        if ":" in move:
            level, name = move.split(":", 1)  # Split only on the first colon
            formatted_moves.append({"name": name.strip(), "method": f"Level {level.strip()}"})
    
    return formatted_moves

print("Paste your moveset (each move in 'level:move' format)")
moveset_input = input().strip()

moveset = [m.strip() for m in moveset_input.split(",") if m.strip()]

formatted_moves = format_moveset(moveset)
with open("movesFormatted.json", "w") as file:
    file.write("[\n")
    file.write(",\n".join(json.dumps(move, separators=(",", ": ")) for move in formatted_moves))
    file.write("\n]")

print("Moveset saved to moves.json")
