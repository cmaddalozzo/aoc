import sys

two = 0
three = 0

def find_box_id(box_ids):
  for box_id in box_ids:
    for other_box_id in box_ids:
      if box_id == other_box_id:
        continue
      i = 0
      diff_chars = 0
      while diff_chars <= 1 and i < len(box_id):
        if box_id[i] != other_box_id[i]:
          diff_chars += 1
        i += 1
      if diff_chars == 1:
        common = ''.join(set(box_id).intersection(set(other_box_id)))
        return common

box_ids = [box_id.strip() for box_id in open('./input.txt')]

print(find_box_id(box_ids))
