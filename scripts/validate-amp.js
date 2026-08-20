import amphtmlValidator from 'amphtml-validator'
import fs from 'fs'

async function validate() {
  const validator = await amphtmlValidator.getInstance()
  const files = fs.readdirSync('.').filter(f => f.endsWith('.html'))

  for (const file of files) {
    const input = fs.readFileSync(file, 'utf8')
    const result = validator.validateString(input)
    if (result.status === 'PASS') {
      console.log(`[AMP VALIDATOR] ${file}: PASS ✅`)
    } else {
      console.log(`[AMP VALIDATOR] ${file}: FAIL ❌`)
      for (let ii = 0; ii < result.errors.length; ii++) {
        const error = result.errors[ii]
        let msg = '  line ' + error.line + ', col ' + error.col + ': ' + error.message
        if (error.specUrl) {
          msg += ' (see ' + error.specUrl + ')'
        }
        console.log(msg)
      }
    }
  }
}

validate().catch(console.error)
