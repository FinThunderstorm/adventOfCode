import { readFile } from "fs/promises"

const dayOne = async () => {
  const file = await readFile("inputs/01.txt", { encoding: "utf8" })
  const inventories = file
    .split("\n\n")
    .map((inventory) => inventory.split("\n"))
    .map((inventory) => inventory.map((food) => parseInt(food)))
    .map((inventory, index) => {
      return {
        position: index + 1,
        items: inventory,
        total: inventory.reduce((a, b) => a + b, 0),
      }
    })
    .sort((a, b) => {
      return b.total - a.total
    })
  console.log(
    "Elf carrying the most calories in total is\n",
    JSON.stringify(inventories[0], null, 2)
  )

  console.log(
    "Three elves carrying the most Calories in total is:",
    inventories[0].total + inventories[1].total + inventories[2].total
  )
}

dayOne()
