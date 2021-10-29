export const orderedArrayPushIndex = (
  originalArray,
  currentArray,
  newItem
) => {
  const newItemIndex = originalArray.indexOf(newItem)
  let insertIndex = currentArray.length
  for (let [index, item] of currentArray.entries()) {
    const itemIndex = originalArray.indexOf(item)
    if (newItemIndex < itemIndex) {
      insertIndex = index
      break
    }
  }
  return insertIndex
}
