import sys

recipes = []
num_elves = 2
target = []
curr_recipes = [];

for i in range(0, len(sys.argv[1])):
  recipes.append(int(sys.argv[1][i]));

for i in range(0, len(sys.argv[2])):
  target.append(int(sys.argv[2][i]))

for i in range(0, num_elves):
  curr_recipes.append(i)

found = False

while not found:
  total = sum(recipes[i] for i in curr_recipes)
  if total < 10:
    recipes.append(total)
  else:
    r1, r2 = str(total)
    recipes.append(int(r1))
    recipes.append(int(r2))

  for i, curr_recipe in enumerate(curr_recipes):
    curr_recipes[i] = (1 + recipes[curr_recipe] + curr_recipe) % len(recipes)

  if len(recipes) % 100 == 0:
    print(f'Have generated {len(recipes)} recipes')

  if len(recipes) > len(target):
    if all([a == target[i] for i, a in enumerate(recipes[-len(target):])]):
      found = True

print(len(recipes) - len(target))
