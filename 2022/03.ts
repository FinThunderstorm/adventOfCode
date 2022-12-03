import { readFile } from "fs/promises"

const itemPriority: { [key: string]: number } = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52,
}

const dayThree = async () => {
  const file = await readFile("inputs/03.txt", { encoding: "utf8" })
  const rucksacks = file.split("\n").map((rucksack) => {
    const firstHalf = rucksack.slice(0, rucksack.length / 2).split("")
    const secondHalf = rucksack
      .slice(rucksack.length / 2, rucksack.length)
      .split("")

    let inBoth = new Set<string>()

    firstHalf.forEach((item) => {
      if (secondHalf.includes(item)) inBoth.add(item)
    })

    const totalPriority = Array.from(inBoth).reduce(
      (sum: number, value: string) => {
        return sum + itemPriority[value]
      },
      0
    )

    return {
      firstHalf,
      secondHalf,
      inBoth,
      totalPriority,
    }
  })

  const totalPriority = rucksacks.reduce((sum: number, rucksack) => {
    return sum + rucksack.totalPriority
  }, 0)

  console.log("Sum of priorities is", totalPriority)
}

const dayThreePartTwo = async () => {
  const file = await readFile("inputs/03.txt", { encoding: "utf8" })
  const rucksacks = file.split("\n").map((rucksack) => rucksack.split(""))

  let priorities = 0

  for (let index = 0; index < rucksacks.length; index = index + 3) {
    let inBoth = new Set<string>()

    const first = rucksacks[index]
    const second = rucksacks[index + 1]
    const third = rucksacks[index + 2]

    first.forEach((item) => {
      if (second.includes(item) && third.includes(item)) inBoth.add(item)
    })

    const totalPriority = Array.from(inBoth).reduce(
      (sum: number, value: string) => {
        return sum + itemPriority[value]
      },
      0
    )

    priorities = priorities + totalPriority
  }

  console.log("Sum of priorities for badges", priorities)
}

dayThree()
dayThreePartTwo()
