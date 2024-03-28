const StringOut = class {
  #string = ''

  reset () {
    this.#string = ''
  }

  write (chunk) {
    this.#string += chunk
  }

  get string () {
    return this.#string
  }
}

export { StringOut }
