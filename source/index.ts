type BrailleGrade = 1 | 2;

interface BrailleState {
  grade: BrailleGrade;
  numeric: boolean;
  capital: boolean;
}

function printToUEB(s: string) {
  const braille: string[] = [];
  let word: string[] = [];
  const state: BrailleState = {
    grade: 1,
    numeric: false,
    capital: false,
  };

  for (const c of s) {
    if (c === " ") {
      braille.push(printWordToUEB(word, state));
      word = [];
      braille.push(" ");
      state.numeric = false;
      state.capital = false;
    } else {
      word.push(c);
    }
  }
  if (word.length > 0) braille.push(printWordToUEB(word, state));
  return braille.join("");
}

function printWordToUEB(w: string[], s: BrailleState) {
  const braille: string[] = [];

  // TODO: word translation should check for word/group signs and general exceptions
  // if grade 2 ueb
  for (const c of w) {
    braille.push(printCharToUEB(c, s));
  }

  return braille.join("");
}

function printCharToUEB(c: string, s: BrailleState): string {
  const codePoint = c.codePointAt(0);
  if (codePoint === undefined) throw new Error("input must be a string");
  if (codePoint >= 48 && codePoint <= 57) {
    // standard numbers
    let numberSign = !s.numeric ? "#" : "";
    s.numeric = true;
    s.grade = 1;
    return numberSign + String.fromCodePoint(65 + ((codePoint - 48 + 9) % 10));
  }
  if (codePoint === 44 || codePoint === 46) {
    return codePoint === 44 ? "1" : "4";
  }
  if (s.numeric) s.numeric = false;
  if (codePoint >= 97 && codePoint <= 120) {
    // lowercase standard alphabet
    return String.fromCodePoint(codePoint - 32);
  }
  return "*";
}

console.log(printToUEB("hello world 123402"));
