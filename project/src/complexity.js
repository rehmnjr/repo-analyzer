export function calculateComplexity(content) {

    let complexity = 1

    const patterns = [
        /\bif\b/g,
        /\bfor\b/g,
        /\bwhile\b/g,
        /\bcatch\b/g,
        /&&/g,
        /\|\|/g
    ]

    for (const pattern of patterns) {

        const matches = content.match(pattern)

        if (matches) {
            complexity += matches.length
        }
    }

    return complexity
}