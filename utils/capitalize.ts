function capitalize(text: string) {
  const words = text.split(" ")

  const capitalizedWords = words.map(word => {
    const capitalizedWord = word[0].toUpperCase() + word.slice(1)
    return capitalizedWord
  })

  return capitalizedWords.join(" ")
}

export default capitalize