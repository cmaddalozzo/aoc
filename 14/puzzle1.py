import sys

recipes = []
num_elves = int(sys.argv[2])
num_recipes = int(sys.argv[3])
curr_recipes = [];

for i in range(0, len(sys.argv[1])):
  recipes.append(int(sys.argv[1][i]));

for i in range(0, num_elves):
  curr_recipes.append(i)

num_recipes += len(recipes)

while len(recipes) < num_recipes:
  total = sum(recipes[i] for i in curr_recipes)
  if total < 10:
    recipes.append(total)
  else:
    r1, r2 = str(total)
    recipes.append(int(r1))
    recipes.append(int(r2))

  for i, curr_recipe in enumerate(curr_recipes):
    curr_recipes[i] = (1 + recipes[curr_recipe] + curr_recipe) % len(recipes)

print(len(recipes))

print("".join([str(n) for n in recipes[409551:409561]]))
