import sys

num_generations = int(sys.argv[2])

class Pot:
  def __init__(state):
    self.generations = [state];
  
  def set_value(generation, value):
    self.generations[generation] = value

  def is_alive(generation):
    self.generations[generation] == '#'

pots = []
rules = []


def test_rule(rule, pots):
  return pots == rule


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
  return (['.'] * front_pad) + g + (['.'] * end_pad), front_pad

with open(sys.argv[1]) as f:
  initial_state = f.readline()
  for i in range(15, len(initial_state)):
    pot = initial_state[i].strip()
    if pot:
      pots.append(pot)
  f.readline()
  for line in f:
    if not '=> .' in line:
      rules.append(line[0:5])


generations = [pad_generation(pots)]

for i in range(1, num_generations + 1):
  lg, last_offset = generations[i-1]
  g = []
  for j, p in enumerate(lg):
    test_pots = [lg[k] if k >= 0 and k < len(lg) else '.' for k in range(j-2, j+3)]
    test_pots = "".join(test_pots)
    res = None
    for r in rules:
      if test_rule(r, test_pots):
        res = '#'
        break
    g.append(res if res else '.')
  g, my_offset = pad_generation(g)
  generations.append((g, last_offset + my_offset))

for i, (gen, offset) in enumerate(generations):
  print(f'Generation {i} ({offset}): {"".join(gen)}')

def alive_plants(gen):
  total = 0

  for k, p in enumerate(gen[0]):
    if p == '#':
      total += k - gen[1]

  return total


for i, gen in enumerate(generations):
  print(f'Plant alive at generation {i}: {alive_plants(gen)}')
