import Sidebar from "../components/Sidebar";
import MobileNav from "./MobileNav";
import Footer from "./Footer";
import MobileMenu from "./MobileMenu";

export default function MainLayout({
  children,
  onAddNote,
  onShowArchived,
  showArchived,
}) {
  return (
    <>
      <Sidebar
        onAddNote={onAddNote}
        onShowArchived={onShowArchived}
        showArchived={showArchived}
      />
      <main className="flex-1 flex flex-col lg:w-[78%] lg:absolute lg:right-0">
        <MobileNav />
        <div className="flex-1 p-4 lg:p-8 min-h-[100vh]">
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
        <Footer />
      </main>
      <MobileMenu
        onAddNote={onAddNote}
        onShowArchived={onShowArchived}
        showArchived={showArchived}
      />
    </>
  );
}
