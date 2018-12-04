
two = 0
three = 0

with open('./input.txt') as f:
  for line in f:
    char_map = {}
    for char in list(line.strip()):
      char_map[char] = char_map[char] + 1 if char in char_map else 1
    counts = char_map.values()
    if 2 in counts:
      two = two + 1
    if 3 in counts:
      three = three + 1

  print(f'Two: {two}, Three: {three}')
  print(two * three)
