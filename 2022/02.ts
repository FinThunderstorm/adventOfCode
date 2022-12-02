import { readFile } from "fs/promises"

const determineWin = (opponent: string, me: string): number => {
  const combined = opponent + me
  switch (combined) {
    //losts
    case "AZ":
    case "CY":
    case "BX":
      return 0
    // draws
    case "AX":
    case "BY":
    case "CZ":
      return 3
    //wins
    case "CX":
    case "BZ":
    case "AY":
      return 6
    default:
      return 0
  }
}

const determineMove = (opponent: string, result: string): string => {
  const combined = opponent + result
  switch (combined) {
    //losts -> if result X
    case "AX":
      return "Z"
    case "CX":
      return "Y"
    case "BX":
      return "X"
    // draws -> if result Y
    case "AY":
      return "X"
    case "BY":
      return "Y"
    case "CY":
      return "Z"
    //wins -> if result Z
    case "CZ":
      return "X"
    case "BZ":
      return "Z"
    case "AZ":
      return "Y"
    default:
      return ""
  }
}

const shapeScore: { [key: string]: number } = {
  X: 1,
  Y: 2,
  Z: 3,
}

const dayTwoPartOne = async () => {
  const file = await readFile("inputs/02.txt", { encoding: "utf8" })
  const scores = file.split("\n").map((row) => {
    const [opponent, me] = row.split(" ")
    return {
      opponent,
      me,
      roundScore: shapeScore[me] + determineWin(opponent, me),
    }
  })
  const totalScore = scores.reduce((sum, value) => {
    return sum + value.roundScore
  }, 0)
  console.log("Strategy guide part one gives total score of", totalScore)
}

const dayTwoPartTwo = async () => {
  const file = await readFile("inputs/02.txt", { encoding: "utf8" })
  const scores = file.split("\n").map((row) => {
    const [opponent, result] = row.split(" ")
    const myMove = determineMove(opponent, result)
    const winScore = determineWin(opponent, myMove)
    return {
      opponent,
      result,
      myMove,
      roundScore: shapeScore[myMove] + winScore,
    }
  })
  const totalScore = scores.reduce((sum, value) => {
    return sum + value.roundScore
  }, 0)
  console.log("Strategy guide part two gives total score of", totalScore)
}

dayTwoPartOne()
dayTwoPartTwo()
