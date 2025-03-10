function truncNumber(number: number, bottomLimit: number, upperLimit: number) {
  const truncatedNumber = Math.max(
    bottomLimit,
    Math.min(upperLimit, number)
  )

  return truncatedNumber;
}

export default truncNumber;