/**
 * Generate coverage-summary.json
 *
 * npx jest \
 *  --coverageReporters="json-summary" \
 *  --coverageDirectory=coverage \
 *  --coverage \
 *  --verbose \
 *  --silent
 *
 * Run
 *
 *  node ./coverage-percent-total.js ./coverage/coverage-summary.json
 */

function coverageReporter() {
  try {
    if (!process.argv[2]) throw new Error('coverage-summary.json not found')
    const coverage = require(process.argv[2])
    const totalSum = ['lines', 'statements', 'functions', 'branches']
      .map((i) => coverage.total[i].pct)
      .reduce((a, b) => a + b, 0)
    const avgCoverage = totalSum / 4
    console.debug('========= Total Coverage ============')
    console.debug(`Total Coverage: ${avgCoverage.toFixed(2)} %`)
    console.debug('=======================================')
  } catch (error) {
    if (error.message.includes('Cannot find module')) {
      console.error(error.message + '\n')
      console.log('Run npm test to generate coverage-summary.json')
      console.log(`\t\`npx jest \\
          --coverageReporters="json-summary" \\
          --coverageDirectory=coverage \\
          --coverage \\
          --verbose \\
          --silent\``)
    }

    if (error.message.includes('coverage-summary.json not found')) {
      console.error(error.message + '\n')
      console.log('Run npm test to generate coverage-summary.json')
      console.log(
        '\t`node ./coverage-percent-total.js ./coverage/coverage-summary.json`',
      )
    }
  }
}

coverageReporter()
