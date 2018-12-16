import sys

num_generations = int(sys.argv[2])
pots = None
rules = {}


def pad_generation(g):
  front_pad = 4
  end_pad = 4
  for i in range(0, front_pad):
    if g[i] == '#':
      break
    front_pad -= 1
  for i in range(0, end_pad):
    if g[-i] == '#':
      break
    end_pad -= 1
  return ('.' * front_pad) + g + ('.' * end_pad), front_pad

with open(sys.argv[1]) as f:
  initial_state = f.readline()
  pots = initial_state[15:len(initial_state)].strip()
  f.readline()
  for line in f:
    if not '=> .' in line:
      rules[line[0:5]] = True

print(pots)
lg, last_offset = pad_generation(pots)

for i in range(1, num_generations + 1):
  if i % 1000 == 0:
    print(f'Checking generation {i}')
  g = ''
  for j in range(2, len(lg)-3):
    g += '#' if lg[j-2:j+3] in rules else '.'

  lg, offset = pad_generation(g)
  last_offset += offset


total = 0

for k, p in enumerate(lg):
  if p == '#':
    total += k - last_offset

print(f'Plant alive at generation {num_generations}: {total}')
