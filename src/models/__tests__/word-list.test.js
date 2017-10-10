import wordList from '../word-list'

describe("wordList array", () => {
    it("should contain 7776 elements", () => {
        expect(wordList.length).toBe(7776);
    });
});