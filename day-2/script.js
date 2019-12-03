const DATA = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,10,1,19,2,19,6,23,2,13,23,27,1,9,27,31,2,31,9,35,1,6,35,39,2,10,39,43,1,5,43,47,1,5,47,51,2,51,6,55,2,10,55,59,1,59,9,63,2,13,63,67,1,10,67,71,1,71,5,75,1,75,6,79,1,10,79,83,1,5,83,87,1,5,87,91,2,91,6,95,2,6,95,99,2,10,99,103,1,103,5,107,1,2,107,111,1,6,111,0,99,2,14,0,0];

const TEST = [1,9,10,3,2,3,11,0,99,30,40,50];

checkOpCode = (pos, data) => {
  const pos1 = data[pos];
  const pos2 = data[data[pos + 1]];
  const pos3 = data[data[pos + 2]];
  if (pos1 === 1) {
    // add the next 2 positions and store in 3rd position
    return pos2 + pos3;
  } else if (pos1 === 2) {
    // multiply the next 2 positions and store in 3rd position
    return pos2 * pos3;
  } else if (pos1 === 99) {
    // end program
    console.log('restore finished.');
    return -1;
  } else {
    // error
    console.log('found error: current number is ', pos1);
    return -99;
  }
};

restoreState = (data) => {
  const fixData = data;
  // Restore to "1202 program alarm" state
  // replace position 1 with 12
  fixData[1] = 12;
  // replace position 2 with 2
  fixData[2] = 2;

  let currPos = 0;
  const length = fixData.length;
  while (currPos < length) {
    const code = checkOpCode(currPos, fixData);
    if (code < 0) {
      console.log('finish', fixData[0]);
      return fixData;
    }
    const updateIdx = fixData[currPos + 3];
    fixData[updateIdx] = code;
    currPos += 4;
    // console.log('fixData', fixData);
  }
  // what value is left at position 0
  console.log('no 99');
  return fixData[0];
}

console.time('AOC2');
restoreState(DATA);
// restoreState(TEST);
console.timeEnd('AOC2');