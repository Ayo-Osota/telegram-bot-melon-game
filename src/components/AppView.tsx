import BottomNav from "./BottomNav";
import TopPanel from "./TopPanel";

function AppView({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-rows-[40px,auto,74px] h-full">
      <TopPanel />
      {children}
      <BottomNav />
    </div>
  );
}

export default AppView;
