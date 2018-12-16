import sys

recipes = sys.argv[1]
target = sys.argv[2]

curr_recipe_0 = 0
curr_recipe_1 = 1

found = False

while not found:
  total = int(recipes[curr_recipe_0]) + int(recipes[curr_recipe_1])
  recipes += str(total)

  curr_recipe_0 = (1 + int(recipes[curr_recipe_0]) + curr_recipe_0) % len(recipes)
  curr_recipe_1 = (1 + int(recipes[curr_recipe_1]) + curr_recipe_1) % len(recipes)

  if len(recipes) % 100 == 0:
    print(f'Have generated {len(recipes)} recipes')

  if len(recipes) > len(target):
    if recipes[-len(target):] == target:
      found = True

print(len(recipes) - len(target))
