/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Class with static methods.
 *
 * @class jsonToCssVar
 */

// eslint-disable-next-line @typescript-eslint/naming-convention
export default class jsonToCssVar {
  /**
   * Converts JSON object to CSS variables.
   *
   * @static
   * @memberof jsonToCssVar
   * @param {object} props
   * @param {object} props.json
   * @param {string} props.cssIndent
   * @param {string} props.cssPrefix
   * @param {string} props.cssSelector
   * @returns {string}
   */

  static convert = ({
    // Props.
    json = {} as object,
    cssIndent = '  ' as string,
    cssPrefix = '--' as string,
    cssSelector = ':root' as string,
  }): string => {
    // Get string.
    const oldStr: string = this.flatten(json)

    // Get list.
    const oldList: string[] = oldStr.split(';').sort()

    // Set later.
    const newList: string[] = []

    // Loop through.
    oldList.forEach((item: string = ''): void => {
      // Item exists: YES.
      if (item) {
        // Add to list.
        newList.push(`${cssIndent}${cssPrefix}${item};`)
      }
    })

    // Get string.
    const newStr: string = newList.join('\n')

    // Expose string.
    return `${cssSelector} {\n${newStr}\n}`
  }

  /**
   * Flattens JSON keys/values into a string.
   *
   * @static
   * @memberof jsonToCssVar
   * @param {object} json
   * @param {string} prevStr
   * @returns {string}
   */
  static flatten = (json: object = {}, prevStr: string = ''): string => {
    // Set later.
    let mainStr: string = ''

    // Loop through.
    Object.entries(json).forEach(([key = '', value = '']): void => {
      // Get string.
      let tempStr: string = this.parseKey(key)

      // String exists: YES.
      if (prevStr) {
        // Update.
        tempStr = `${prevStr}-${tempStr}`
      }

      // Is object: YES.
      if (this.isObject(value)) {
        // Recursion.
        tempStr = this.flatten(value, tempStr)
      } else {
        // Clean up.
        const newValue: string = Array.isArray(value)
          ? value.map(this.parseValue).join(', ')
          : this.parseValue(value)

        // Update.
        tempStr = `${tempStr}: ${newValue};`
      }

      // Add string.
      mainStr += tempStr
    })

    // Expose string.
    return mainStr
  }

  /**
   * Checks if a value is an object.
   *
   * @static
   * @memberof jsonToCssVar
   * @param {object} obj
   * @returns {boolean}
   */
  static isObject = (obj: object | null = null): boolean => {
    // Expose boolean.
    return !!(obj && typeof obj === 'object' && !Array.isArray(obj))
  }

  /**
   * Normalizes keys to kebab case.
   *
   * @static
   * @memberof jsonToCssVar
   * @param {string} key
   * @returns {string}
   */
  static parseKey = (key: string = ''): string => {
    // Clean up.
    let newKey: string = String(key)
    newKey = newKey.trim()
    newKey = newKey.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    newKey = newKey.replace(/\s+/g, '-')
    newKey = newKey.replace(/_+/g, '-')
    newKey = newKey.replace(/-+/g, '-')
    newKey = newKey.toLowerCase()

    // Dash at start: YES.
    if (newKey.startsWith('-')) {
      // Update.
      newKey = newKey.slice(1)
    }

    // Dash at end: YES.
    if (newKey.endsWith('-')) {
      // Update.
      newKey = newKey.slice(0, -1)
    }

    // Expose string.
    return newKey
  }

  /**
   * Potentially quotes CSS value.
   *
   * @static
   * @memberof jsonToCssVar
   * @param {string} value
   * @returns {string}
   */
  static parseValue = (value: string = ''): string => {
    // Clean up.
    let newValue: string = String(value)
    newValue = newValue.trim()
    newValue = newValue.replace(/\s+/g, ' ')

    if (newValue.match(/\s/g) && newValue.toLowerCase() !== newValue) {
      // Update.
      newValue = `'${newValue}'`
    }

    // Expose string.
    return newValue
  }
}
