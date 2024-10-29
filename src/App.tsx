import { Outlet } from "react-router-dom";

import AppView from "./components/AppView";

function App() {
  return (
    <AppView>
      <Outlet />
    </AppView>
  );
}

export default App;
