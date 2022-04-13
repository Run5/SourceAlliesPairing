//bowling score calculator
//input = scoreboard
//10 frames
//each frame has up to 2 rolls
//special scoring on final (10th frame) (possibly more rolls)
//scoring an open frame = sum of two rolls
//spare checks ahead to next throw and is added to spare frame (can't be scored until at least the first throw of the next frame)
//strike (add next two throws to the strike frame)
//outputs the final score

// [3, 4, 10, X, ...]
// [(3, 4), (10, 0), ()]
// {
//   frame1: [1, 6],
//   frame2: [10, 0],
//   ...
//   frame10: [10, 7, 3]
// }
// "0345XS"

//NOTES FROM PAIRING SESSION ABOVE

export const bowlingScore = (rolls) => {

  //are the rolls valid (throw error if not)
  if(rolls.length !== 21) throw "invalid data";

  //declare sum variable
  let score = 0;

  //check the last roll once to make sure its valid as its a special case
  if(rolls[20] > 10 || rolls[20] < 0) throw "impossible roll"
  //loop through frames and update final score
  for(let i = 0; i <= rolls.length - 2; i+=2) {

    //check if rolls are valid, and throw an error if they're not
    if(rolls[i] > 10 || rolls[i] < 0 || rolls [i+1] > 10 || rolls[i+1] < 0) throw "impossible roll"
    else if (rolls[i] + rolls[i+1] > 10 && i !== 18) throw "impossible frame"
    else { //if rolls are valid add to score

      if(i === 18) { //if i is 18 we are looking at the 10th frame which has its own set of rules

        if(rolls[i] + rolls[i + 1] < 10 && rolls[i + 2] > 0) throw "impossible 10th frame"
        else score = score + rolls[i] + rolls[i + 1] + rolls[i + 2];

      } else {

        if(rolls[i] === 10) {//if strike

          if(rolls[i+2] === 10) { //if next frame is strike

            //10th frame is special so check if we're on the 9th frame
            if(i === 16) {

              //if the initial strike was rolled on frame 9 we only need to check the next two rolls for frame 10
              score = score + 20 +rolls[i + 3];

            } else {

              //if the initial strike was rolled on any frame before the 9th, we may only need to check the first roll of the next 2 frames
              score = score + 20 + rolls[i + 4];

            }

          } else { //if next frame is anything but a strike

            score = score + 10 + rolls[i + 2] + rolls[i + 3];

          }

        } else if (rolls[i] + rolls[i+1] === 10) { //if spare

          score = score + 10 + rolls[i+2];

        } else { //if anything other than spare or strike

          score = score + rolls[i] + rolls[i+1]

        }

      }

    }

  }

  //return a final score
  return score;
};
