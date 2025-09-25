import { NotebookText } from "lucide-react";

export default function MobileNav() {
  return (
    <nav className="w-full my-9 px-4 pr-10 flex items-center justify-between sm:hidden">
      <div className="px-3 h-10 w-36 bg-gray-200 rounded-2xl flex items-center justify-center">
        <h1 className="text-base font-bold text-gray-800">
          &lt;NioNotes /&gt;
        </h1>
      </div>
      <NotebookText size={27} className="text-gray-400" />
    </nav>
  );
}
