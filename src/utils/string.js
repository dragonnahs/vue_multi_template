/**
 * 比较两个版本号的大小
 * if left > right return -1
 * if left < right return 1
 * if left = right return 0
 */
export function compareVersion(left, right) {
  const regex = /^(\d+)\.*(\d*)\.*(\d*)/
  if (regex.test(left) && regex.test(right)) {
    const leftMatch = left.match(regex)
    const rightMatch = right.match(regex)
    const x = [parseInt(leftMatch[1]), parseInt(rightMatch[1])]
    const y = [parseInt(leftMatch[2]), parseInt(rightMatch[2])]
    const z = [parseInt(leftMatch[3]), parseInt(rightMatch[3])]
    if (x[1] !== x[0]) return x[1] > x[0] ? 1 : -1
    if (y[1] !== y[0]) return y[1] > y[0] ? 1 : -1
    if (z[1] !== z[0]) return z[1] > z[0] ? 1 : -1
    return 0
  }
}
