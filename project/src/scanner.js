import fs from "fs"
import path from "path"

export function scanRepository(repoPath) {
    const files = fs.readdirSync(repoPath)

    let jsCount = 0
    let totalLines = 0
    let blankLines = 0
    let commentLines = 0

    for (const file of files) {

        const filePath = path.join(repoPath, file)

        if (path.extname(file) === ".js") {

            jsCount++

            const content = fs.readFileSync(filePath, "utf-8")

            const lines = content.split("\n")

            totalLines += lines.length

            for (let i = 0; i < lines.length; i++) {

                const line = lines[i]

                const isLastLine = i === lines.length - 1


                if (line.trim() === "") {

                    if (isLastLine) {
                        continue
                    }

                    blankLines++
                }


                if (line.trim().startsWith("//")) {
                    commentLines++
                }
            }
        }
    }

    return {
        javascript: {
            fileCount: jsCount,
            totalLines: totalLines,
            blankLines: blankLines,
            commentLines: commentLines
        }
    }
}