import * as c from "@clack/prompts";
import color from "picocolors";
import chalkAnimation from "chalk-animation";

let playerName;
let totalCorrect = 0;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const s = c.spinner();

class Question {
  constructor(question, answersArray, correctAnswerIndex) {
    this.question = question;
    this.answersArray = answersArray;
    this.correctAnswerIndex = correctAnswerIndex;
  }
}

async function welcome() {
  const welcomeMessage = chalkAnimation.neon(
    "10 Disney Trivia Questions Only Real Fans Will Know!\n"
  );
  await sleep(3000);
  welcomeMessage.stop();

  await askName();
  s.start();
  await sleep(1000);
  s.stop();

  c.intro(
    `${color.bgMagenta(
      color.black(
        `Welcome ${playerName} ! Answer all 10 questions corectly for a secrete message at the end 😉`
      )
    )}`
  );
}

async function askName() {
  await c.text({
    message: "Please enter your name.",
    placeholder: "John doe",
    validate(value) {
      if (value.length === 0) return `Name is required!`;
      playerName = value;
    },
  });
}

async function askQuestion(question, answers, correctAnswerIndex) {
  const options = [];
  answers.forEach((answer) => {
    options.push({ value: answer, label: answer });
  });

  const answer = await c.select({
    message: question,
    initialValue: "1",
    options: options,
  });
  s.start();
  await sleep(1000);
  s.stop();

  if (answer == answers[correctAnswerIndex]) {
    const correctAnswerMessage = chalkAnimation.rainbow(
      "✅Correct answer✅ \n"
    );
    s.start();
    await sleep(2000);
    s.stop();
    correctAnswerMessage.stop();
    totalCorrect++;
  } else {
    const WrongAnswerMessage = chalkAnimation.pulse("❌Wrong answer❌\n");
    s.start();
    await sleep(2000);
    s.stop();
    WrongAnswerMessage.stop();
    c.outro(
      `${color.bgMagenta(
        color.black(`You got ${totalCorrect} questions correct! Try again 😃`)
      )}`
    );
    process.exit();
  }
}

async function main() {
  console.clear();
  await welcome();
  const question1 = new Question(
    "1) What sort of animal is Walt Disney's Dumbo?? 🐘🪽",
    ["Deer", "Rabbit", "Elephant", "Donkey"],
    2,
    "s",
    "a"
  );

  const question2 = new Question(
    "2) Which Disney character famously leaves a glass slipper behind at a royal ball? 👠",
    ["Pocahontas", "Cinderella", "Elsa", "Sleeping Beauty"],
    1
  );

  const question3 = new Question(
    "3) Which poisonous fruit did Snow White eat? ❄️",
    ["Orange", "Banana", "Peach", "Apple"],
    3
  );

  const question4 = new Question(
    "4) What animal did Peter Pan feed Captain Hook's hand to? 🪝",
    ["Crocodile", "Shark", "Whale", "Lion"],
    0
  );

  const question5 = new Question(
    "5)  What was the first Pixar Movie 🎥",
    ["Toy Story", "The Incredibles", "Up", "Monsters, Inc"],
    0
  );

  const question6 = new Question(
    "6) What was the name of Walt Disney's first cartoon character? 🦆",
    ["Donald Duck", "Goofy", "Mickey Mouse", "Oswald the Lucky Rabbit"],
    3
  );

  const question7 = new Question(
    "7) What is the name of the teapot character in? 🫖",
    ["Mrs. Potts", "Mr. Pots", "Mrs. TeaPot", "Mrs. Potter"],
    0
  );

  const question8 = new Question(
    "8) In what year did Mickey Mouse make his first appearance? 🐭",
    ["1909", "1911", "1928", "1925"],
    2
  );

  const question9 = new Question(
    "9) In Up, which continent do Carl and Russell travel to? 🏠🎈",
    ["Africa", "South America", "Asia", "North America"],
    1
  );

  const question10 = new Question(
    "10) Which of these Princesses is not actually (or doesn't marry into) royalty? 👸",
    ["Belle", "Elsa", "Aurora", "Mulan"],
    3
  );

  const allQuestions = [
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question7,
    question8,
    question9,
    question10,
  ];

  const readyToPlay = await c.select({
    message: "Ready to play?",
    initialValue: "Yes",
    options: [
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ],
  });
  s.start();
  await sleep(1000);
  s.stop();

  if (readyToPlay == "Yes") {
    for (const question of allQuestions) {
      await askQuestion(
        question.question,
        question.answersArray,
        question.correctAnswerIndex
      );
    }
  } else {
    c.outro(
      `${color.bgMagenta(
        color.black(`Bruh..come back when you're ready i guess 🙄`)
      )}`
    );
    process.exit();
  }
  c.outro(
    `${color.bgMagenta(
      color.black(`You got all ${totalCorrect} questions correct! 😲`)
    )}`
  );

  if (totalCorrect == 10) {
    s.start("Generating secret message");
    await sleep();
    s.stop();
    const secretMessage = chalkAnimation.glitch(
      `Congrats! ${playerName} you got all 10 questions right! Now go outside and touch grass! 🤓🤓`
    );
    await sleep(6000);
    secretMessage.stop();
  } else {
    s.start();
    await sleep();
    s.stop();
    c.outro(
      `${color.bgMagenta(
        color.black(
          `Wait! how are you here? if you see this there is a bug and i was too lazy to check my code properly. But you need 10/10 right answers to properly complete the game. Try again!!`
        )
      )}`
    );
  }
}

main().catch(console.error);
