import colorData from '../assets/colorData'
import IColors from '../Models/IColors'

export default () => {
  const getRandomColor = (oldColor?: IColors): IColors => {
    //todo get random color from the colordata.ts file hahahah
    const generatedColor =
      colorData[Math.floor(Math.random() * colorData.length)]
    //if (getRandomColor === oldColor) return getRandomColor(oldColor)

    return generatedColor
  }

  return {
    getRandomColor,
    
  }
}
