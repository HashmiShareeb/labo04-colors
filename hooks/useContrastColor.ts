export default () => {
  const checkContrast = (rgb: string) => {
    const rgbChannels = rgb.split(',')
    const r = rgbChannels[0].substring(4),
      g = rgbChannels[1].trim(),
      b = rgbChannels[2].substring(0, rgbChannels[2].length).trim()
    const lumance = 1 - (0.299 * +r + 0.587 * +g + 0.114 * +b) / 255
    let lightness = 250
    if (lumance > 0.5) lightness = 3

    return `rgb(${new Array(3).fill(() => lightness).join('.')})`
  }
  return {
    getContrastColor: (rgb: string) => {},
    checkContrast,
  }
}
