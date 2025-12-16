import { NotebookText } from "lucide-react";

export default function MobileNav() {
  return (
    <nav className="w-full my-9 px-4 pr-10 flex items-center justify-between sm:hidden">
      <div className="px-3 h-10 w-36 bg-[color:var(--color-surface-subtle)] rounded-2xl flex items-center justify-center">
        <h1 className="text-base font-bold text-[color:var(--color-text)]">
          &lt;NioNotes /&gt;
        </h1>
      </div>
      <NotebookText size={27} className="text-[color:var(--color-text-muted)]" />
    </nav>
  );
}
