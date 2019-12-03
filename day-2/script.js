const DATA = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,10,1,19,2,19,6,23,2,13,23,27,1,9,27,31,2,31,9,35,1,6,35,39,2,10,39,43,1,5,43,47,1,5,47,51,2,51,6,55,2,10,55,59,1,59,9,63,2,13,63,67,1,10,67,71,1,71,5,75,1,75,6,79,1,10,79,83,1,5,83,87,1,5,87,91,2,91,6,95,2,6,95,99,2,10,99,103,1,103,5,107,1,2,107,111,1,6,111,0,99,2,14,0,0];

const TEST = [1,9,10,3,2,3,11,0,99,30,40,50];

checkOpCode = (pointer, data) => {
  const opcode = data[pointer];
  const param2 = data[data[pointer + 1]];
  const param3 = data[data[pointer + 2]];
  if (opcode === 1) {
    // add the next 2 positions and store in 3rd position
    return param2 + param3;
  } else if (opcode === 2) {
    // multiply the next 2 positions and store in 3rd position
    return param2 * param3;
  } else if (opcode === 99) {
    // end program
    // console.log('restore finished.');
    return -1;
  } else {
    // error
    console.log('found error: current number is ', opcode);
    return -99;
  }
};

restoreState = (noun, verb, data) => {
  const memory = data;
  // Restore to "1202 program alarm" state
  // replace position 1 with 12
  memory[1] = noun;
  // replace position 2 with 2
  memory[2] = verb;

  let instPtr = 0;
  const length = memory.length;
  while (instPtr < length) {
    const code = checkOpCode(instPtr, memory);
    if (code < 0) {
      // console.log('finish', memory[0]);
      // return memory[0];
      break;
    }
    const updateIdx = memory[instPtr + 3];
    memory[updateIdx] = code;
    instPtr += 4;
    // console.log('memory', memory);
  }
  // what value is left at position 0
  // console.log('no 99');
  const output = memory[0];
  return output;
}

findNounVerb = (desiredOutput) => {
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 99; verb >= 0; verb--) {
      const cloneData = JSON.parse(JSON.stringify(DATA));
      const output = restoreState(noun, verb, cloneData);
      if (output === desiredOutput) return { noun, verb };
    }
  }
  return 'answer not found.';
};

console.time('AOC2');
// part 1
// restoreState(TEST);
// const output = restoreState(12, 2, DATA);
// console.log('output', output);

// part 2
// what pair of input produces 19690720
const desiredOutput = 19690720;
const inputs = findNounVerb(desiredOutput);
console.log('inputs', inputs, 100 * inputs.noun + inputs.verb);
console.timeEnd('AOC2');