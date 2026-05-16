import fs from "fs"
import path from "path"

export function scanRepository(repoPath) {
    const files = fs.readdirSync(repoPath)

    let jsCount = 0
    let totalLines = 0
    let blankLines = 0

    for (const file of files) {
        const filePath = path.join(repoPath, file)

        if (path.extname(file) === ".js") {
            jsCount++

            const content = fs.readFileSync(filePath, "utf-8")

            const lines = content.split("\n")

            totalLines += lines.length

            for (const line of lines) {
                if (line.trim() === "") {
                    blankLines++
                }
            }
        }
    }

    return {
        javascript: {
            fileCount: jsCount,
            totalLines: totalLines,
            blankLines: blankLines
        }
    }
}