import fs from "fs"
import path from "path"

function getAllFiles(dirPath) {

    let results = []

    const files = fs.readdirSync(dirPath)

    for (const file of files) {

        const filePath = path.join(dirPath, file)

        const stat = fs.statSync(filePath)

        if (stat.isDirectory()) {

            // Ignore node_modules
            if (file === "node_modules") {
                continue
            }

            results = results.concat(
                getAllFiles(filePath)
            )

        } else {

            results.push(filePath)
        }
    }

    return results
}

export function scanRepository(repoPath) {

    const files = getAllFiles(repoPath)

    let jsCount = 0
    let totalLines = 0
    let blankLines = 0
    let commentLines = 0

    for (const filePath of files) {

        if (path.extname(filePath) === ".js") {

            jsCount++

            const content = fs.readFileSync(
                filePath,
                "utf-8"
            )

            const lines = content.split("\n")

            totalLines += lines.length

            for (let i = 0; i < lines.length; i++) {

                const line = lines[i]

                const isLastLine =
                    i === lines.length - 1

                if (line.trim() === "") {

                    if (isLastLine) {
                        continue
                    }

                    blankLines++
                }

                if (
                    line.trim().startsWith("//")
                ) {
                    commentLines++
                }
            }
        }
    }

    return {
        javascript: {
            fileCount: jsCount,
            totalLines,
            blankLines,
            commentLines
        }
    }
}