import re

naps = {}

logs = [log.strip() for log in open('./input.txt')]
logs.sort()


re_shift_start = re.compile('.+Guard #(?P<id>\\d+) begins shift$')
re_time = re.compile('\[[^:]+:(?P<time>\\d{2})\]')

i = 0
curr_guard_id = None
while i < len(logs):
    m = re_shift_start.match(logs[i])
    if m:
        curr_guard_id = m.group('id')
        if curr_guard_id not in naps:
            naps[curr_guard_id] = [0] * 60
        i += 1
    else:
        start = int(re_time.match(logs[i]).group('time'))
        end = int(re_time.match(logs[i+1]).group('time'))
        for j in range(start, end):
            naps[curr_guard_id][j] += 1
        i += 2

sleepiest = sorted(naps.keys(), key=lambda g: sum(naps[g]))[-1]

sleepiest_minute = max(naps[sleepiest])

print(sleepiest)
print(naps[sleepiest].index(sleepiest_minute))
