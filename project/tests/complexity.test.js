import { describe, it, expect } from "vitest"

describe("complexity", () => {

    it("must calculate cyclomatic complexity", async () => {

        const mod =
            await import("../src/complexity.js")

        const fs =
            await import("fs")

        const content =
            fs.readFileSync(
                "./fixtures/complexity.js",
                "utf-8"
            )

        const result =
            mod.calculateComplexity(content)

        expect(result).toBe(3)
    })
})