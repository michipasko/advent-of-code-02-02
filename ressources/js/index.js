/*
Opcode 1: 
Adds together numbers read from two positions and stores the result in a third position.
The three integers immediately after the opcode tell you these three positions - the first two 
indicate the positions from which you should read the input values, and the third indicates 
the position at which the output should be store

1,2,3,7
1 - 2 + 3 (= 5) - overwrite 7 with 5 

Opcode 99: 
Program is finished and should immediately halt. 

OpCode Unknown: 
Something went wrong.

*/


"use strict"

//Input Task 1
const intcode = [1,12,2,3,1,1,2,3,1,3,4,3,1,5,0,3,2,13,1,19,1,6,19,23,2,23,6,27,1,5,27,31,1,10,31,35,2,6,35,39,1,39,13,43,1,43,9,47,2,47,10,51,1,5,51,55,1,55,10,59,2,59,6,63,2,6,63,67,1,5,67,71,2,9,71,75,1,75,6,79,1,6,79,83,2,83,9,87,2,87,13,91,1,10,91,95,1,95,13,99,2,13,99,103,1,103,10,107,2,107,10,111,1,111,9,115,1,115,2,119,1,9,119,0,99,2,0,14,0]
const opcodeLength = 4


// Additionaml Input Task 2
const expectedOutput = 19690720
const intStart = 0
const intEnd = 99


// Functions Task 1
const prepareIntcodeForProcessing = (intcode, opcodeLength, opcodeNumber) => {
    let intcodeTransformed = []

    for (let i = 0; i < intcode.length; i += opcodeLength) {
        const opcode = intcode.slice(i, i + opcodeLength)
        intcodeTransformed.push(opcode)
    }

    return intcodeTransformed[opcodeNumber]
}
 

const getProcessedIntcode = (intcode, opcodeLength) => {

    //creates a copy of intcode
    const intcodeCopy = intcode.slice()
    const numberOpcodes = Math.ceil(intcodeCopy.length / opcodeLength)

    for (let i = 0; i < numberOpcodes; i++) {
        let opcode = prepareIntcodeForProcessing(intcodeCopy, opcodeLength, i)
        let opcodeNum = opcode[0]
        
        // Opcode 1 (Add)
        if (opcodeNum === 1) {
            let input1 = intcodeCopy[opcode[1]]
            let input2 = intcodeCopy[opcode[2]]
            let output = input1 + input2
            let posOutput = opcode[3]
            intcodeCopy.splice(posOutput, 1, output)
        }

        // Opcode 2 (Multiply)
        else if (opcodeNum === 2) {
            let input1 = intcodeCopy[opcode[1]]
            let input2 = intcodeCopy[opcode[2]]
            let output = input1 * input2
            let posOutput = opcode[3]
            intcodeCopy.splice(posOutput, 1, output)
        }

        // Programm finished
        else if (opcodeNum === 99) {
            break
        }
    }

    const intcodeProcessed = intcodeCopy
    return intcodeProcessed
}


// Solution Task 1
console.log("Solution Task 1:", getProcessedIntcode(intcode, opcodeLength)[0])

// Testing Task 1
const testintcode1 = [1,0,0,0,99]
console.log(getProcessedIntcode(testintcode1, opcodeLength))
console.log("Test 1:", getProcessedIntcode(testintcode1, opcodeLength).join("") === "200099")

console.log("-".repeat(30))

const testintcode2 = [2,3,0,3,99]
console.log(getProcessedIntcode(testintcode2, opcodeLength))
console.log("Test 2:", getProcessedIntcode(testintcode2, opcodeLength).join("") === "230699")

console.log("-".repeat(30))

const testintcode3 = [2,4,4,5,99,0]
console.log(getProcessedIntcode(testintcode3, opcodeLength))
console.log("Test 3:", getProcessedIntcode(testintcode3, opcodeLength).join("") === "2445999801")

console.log("-".repeat(30))

const testintcode4 = [1,1,1,4,99,5,6,0,99]
console.log(getProcessedIntcode(testintcode4, opcodeLength))
console.log("Test 4:", getProcessedIntcode(testintcode4, opcodeLength).join("") === "30114256099")


// Functions 2
const findNounAndVerb = (intcode, opcodeLength, expectedOutput, intStart, intEnd) => {
    for (let i = intStart; i < intEnd; i++) {
        for (let j = intStart; j < intEnd; j++) {
            const intcodeCopy = intcode.slice()
            intcodeCopy[1] = i
            intcodeCopy[2] = j
            let output = getProcessedIntcode(intcodeCopy, opcodeLength)
            
            if (output[0] === expectedOutput) {
                return (i * 100 + j)
            }
        }
    }
} 


// Solution Task 2
console.log
console.log("Solution Task 2:", findNounAndVerb(intcode, opcodeLength, expectedOutput, intStart, intEnd))