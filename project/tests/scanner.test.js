import { describe, it, expect } from "vitest"

describe("scanner", () => {
    it("scanRepository must exist", async () => {
        let mod

        try {
            mod = await import("../src/scanner.js")
        } catch {
            expect(false).toBe(true)
            return
        }

        expect(typeof mod.scanRepository).toBe("function")
    })

    it("must count JavaScript files", async () => {
        const mod = await import("../src/scanner.js")

        const result = mod.scanRepository("./fixtures/sample-repo")

        expect(result.javascript.fileCount).toBe(3)
    })

    it("must count total lines", async () => {
        const mod = await import("../src/scanner.js")

        const result = mod.scanRepository("./fixtures/sample-repo")

        expect(result.javascript.totalLines).toBe(9)
    })
    it("must count blank lines", async () => {
        const mod = await import("../src/scanner.js")

        const result = mod.scanRepository("./fixtures/sample-repo")

        expect(result.javascript.blankLines).toBe(1)
    })
    it("must count comment lines", async () => {

        const mod = await import("../src/scanner.js")

        const result = mod.scanRepository("./fixtures/sample-repo")

        expect(result.javascript.commentLines).toBe(1)
    })

})