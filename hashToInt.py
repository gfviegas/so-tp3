from functools import reduce


hash = '86e90a36'
ints = list(map(ord, hash))
res = int(reduce(lambda total, d: (2 * total) + d, ints, 1))
print(res)
