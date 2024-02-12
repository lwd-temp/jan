import { BrowserWindow } from 'electron'

/**
 * Manages the current window instance.
 */
export class WindowManager {
  public static instance: WindowManager = new WindowManager()
  public currentWindow?: BrowserWindow

  constructor() {
    if (WindowManager.instance) {
      return WindowManager.instance
    }
  }

  /**
   * Creates a new window instance.
   * @param {Electron.BrowserWindowConstructorOptions} options - The options to create the window with.
   * @returns The created window instance.
   */
  createWindow(options?: Electron.BrowserWindowConstructorOptions | undefined) {
    this.currentWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      // min width and height based on iphone SE
      minWidth: 375,
      minHeight: 667,
      trafficLightPosition: {
        x: 8,
        y: 13,
      },
      titleBarStyle: 'hidden',
      ...options,
    })
    return this.currentWindow
  }
}
