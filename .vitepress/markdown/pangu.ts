import type MarkdownIt from 'markdown-it'
import pangu from 'pangu'

function getPreviousCharacter(tokens: { content: string, type: string }[], index: number) {
  for (let current = index - 1; current >= 0; current -= 1) {
    const { content, type } = tokens[current]
    if (type === 'html_inline')
      break
    if (content)
      return content.slice(-1)
  }

  return ''
}

export default function markdownItPangu(md: MarkdownIt) {
  md.renderer.rules.text = (tokens, index) => {
    const previousCharacter = getPreviousCharacter(tokens, index)
    const content = pangu.spacingText(previousCharacter + tokens[index].content)
    return md.utils.escapeHtml(content.slice(previousCharacter.length))
  }

  const codeInlineRule = md.renderer.rules.code_inline
  if (!codeInlineRule)
    return

  md.renderer.rules.code_inline = (tokens, index, options, env, self) => {
    let output = codeInlineRule(tokens, index, options, env, self)
    if (!output)
      return output

    if (index > 0 && !md.utils.isWhiteSpace(output.charCodeAt(0)))
      output = ` ${output}`
    if (
      index < tokens.length - 1
      && tokens[index + 1].type !== 'text'
      && !md.utils.isWhiteSpace(output.charCodeAt(output.length - 1))
    )
      output += ' '

    return output
  }
}
