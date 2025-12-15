import { NotebookText } from "lucide-react";

export default function MobileNav() {
  return (
    <nav className="w-full py-4 px-6 flex items-center justify-between lg:hidden border-b-2 border-gray-200 bg-white">
      <div className="px-4 py-2 bg-gray-900 rounded-lg">
        <h1 className="text-base font-bold text-white">
          &lt;NioNotes /&gt;
        </h1>
      </div>
      <NotebookText size={28} className="text-gray-900" />
    </nav>
  );
}
