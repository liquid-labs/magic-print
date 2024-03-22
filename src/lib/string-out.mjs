const StringOut = class {
  #string = ''

  write(chunk) {
    this.#string += chunk
  }

  get string() {
    return this.#string
  }
}

export { StringOut }