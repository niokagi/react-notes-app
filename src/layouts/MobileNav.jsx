import { NotebookText } from "lucide-react";

export default function MobileNav() {
  return (
    <nav className="w-full my-9 px-4 pr-10 flex items-center justify-between sm:hidden animate-fade-in">
      <div className="px-4 h-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center border border-gray-200 shadow-sm">
        <h1 className="text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          &lt;NioNotes /&gt;
        </h1>
      </div>
      <NotebookText size={28} className="text-blue-600" />
    </nav>
  );
}
