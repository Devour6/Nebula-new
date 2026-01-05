import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <p className="text-white/40 text-sm" data-testid="text-copyright">
        &copy; 2026 Nebula Node
      </p>
    </motion.footer>
  );
}
