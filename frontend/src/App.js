import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Home from "./pages/Home";
import Room from "./pages/Room";

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/:id" element={<Room />} />
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </div>
  );
}

export default App;