
import { Main } from "./components/layout/Main";
import { Navbar } from "./components/layout/Navbar";
function App() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-primary">
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
