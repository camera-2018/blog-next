function readNumber(properties, name, fallback) {
  const value = Number.parseFloat(properties.get(name).toString())
  return Number.isFinite(value) ? value : fallback
}

function hash(x, y) {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return value - Math.floor(value)
}

class BlogTexturePainter {
  static get inputProperties() {
    return [
      '--houdini-texture-color',
      '--houdini-texture-gap',
      '--houdini-texture-opacity',
    ]
  }

  paint(context, geometry, properties) {
    const gap = Math.max(20, readNumber(properties, '--houdini-texture-gap', 34))
    const opacity = Math.min(
      0.16,
      Math.max(0, readNumber(properties, '--houdini-texture-opacity', 0.075)),
    )
    const color = properties.get('--houdini-texture-color').toString().trim() || '#18181b'
    const columns = Math.ceil(geometry.width / gap) + 1
    const rows = Math.ceil(geometry.height / gap) + 1

    context.fillStyle = color

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const visibility = hash(column + 17, row + 29)
        if (visibility < 0.36)
          continue

        const jitterX = (hash(column + 41, row + 7) - 0.5) * gap * 0.36
        const jitterY = (hash(column + 5, row + 53) - 0.5) * gap * 0.36
        const radius = 0.35 + hash(column + 73, row + 11) * 0.75
        const x = column * gap + (row % 2 ? gap / 2 : 0) + jitterX
        const y = row * gap + jitterY

        context.globalAlpha = opacity * (0.45 + visibility * 0.55)
        context.beginPath()
        context.arc(x, y, radius, 0, Math.PI * 2)
        context.fill()
      }
    }
  }
}

registerPaint('blog-texture', BlogTexturePainter)
