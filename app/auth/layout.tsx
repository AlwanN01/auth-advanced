//#region Imports
import type { FC } from "react"

//#endregion Imports
type Props = { children: React.ReactNode }

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="bg-gradient-primary flex h-full items-center  justify-center ">{children}</div>
  )
}

export default Layout
