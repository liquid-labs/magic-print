const assignIfDefined = (...objects) => {
  const targetObject = objects[0]
  for (let i = 1; i < objects.length; i += 1) {
    if (objects[i] === undefined || objects[i] === null) {
      continue
    }

    const subject = objects[i]
    for (const [key, value] of Object.entries(subject)) {
      if (value !== undefined) {
        targetObject[key] = value
      }
    }
  }

  return targetObject
}

export { assignIfDefined }
