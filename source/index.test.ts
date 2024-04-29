import { describe, expect, it } from "@jest/globals";
import { printToUEB } from "./index.js";

describe("printToUEB", () => {
  describe("translation of lowercase letters", () => {
    it("should convert lower case letters to braille ASCII", () => {
      let letter = "a";

      while (letter !== "z") {
        expect(printToUEB(letter)).toEqual(letter.toUpperCase());
        letter = String.fromCharCode(letter.charCodeAt(0) + 1);
      }
      expect(printToUEB(letter)).toEqual(letter.toUpperCase());
    });
    it("should handle spaces", () => {
      expect(printToUEB(" ")).toEqual(" ");
      expect(printToUEB("hello world")).toEqual("HELLO WORLD");
    });
  });
  describe("translation of numbers", () => {
    it("should convert signle digit numbers", () => {
      expect(printToUEB("0")).toEqual("#J");
      for (let i = 1; i < 9; i++) {
        expect(printToUEB(i.toString())).toEqual(
          "#" + String.fromCodePoint(i + 64),
        );
      }
    });
    it("should convert multiple digit numbers", () => {
      expect(printToUEB("11")).toEqual("#AA");
      expect(printToUEB("123")).toEqual("#ABC");
      expect(printToUEB("1234567890")).toEqual("#ABCDEFGHIJ");
    });
    it("should handle decimals and commas without interrupting numeric mode", () => {
      expect(printToUEB("1.0")).toEqual("#A4J");
      expect(printToUEB("1,000")).toEqual("#A1JJJ");
    });
  });
});
