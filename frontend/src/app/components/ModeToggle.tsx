import { motion } from "motion/react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative p-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full overflow-hidden flex items-center justify-center h-10 w-10 ml-2 lg:ml-0"
      aria-label="Toggle dark mode"
    >
      <Sun className="h-5 w-5 transition-transform duration-500 scale-100 rotate-0 dark:scale-0 dark:rotate-90" />
      <Moon className="absolute h-5 w-5 transition-transform duration-500 scale-0 -rotate-90 dark:scale-100 dark:rotate-0" />
    </motion.button>
  )
}
