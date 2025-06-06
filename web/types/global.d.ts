export {}

declare global {
  type Resize = {
    realTimeWidth: number
    downWidth: number
    show?: boolean
  }

  type MainLayout = {
    contentLayout: Resize
    rightLayout: Resize & {
      minWidth: number
    }
  }
}
