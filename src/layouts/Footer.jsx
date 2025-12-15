import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bottom-0 w-full mx-auto text-center mt-20 mb-12 animate-fade-in">
      <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
        <span className="max-sm:text-sm font-medium">Made with</span>
        <Heart size={16} className="text-red-500 fill-red-500" />
        <span className="max-sm:text-sm font-medium">by Adhim Niokagi</span>
      </div>
      <h2 className="text-gray-400 max-sm:text-xs">
        Dicoding submission - React development learning path
      </h2>
    </footer>
  );
}
