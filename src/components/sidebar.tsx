import { ThemeToggle } from "./theme-toggle"

export const Sidebar = () => {
  return (
    <section className="flex h-screen w-[25%] border-r">
      <ThemeToggle />
    </section>
  )
}