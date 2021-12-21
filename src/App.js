import Home from "./component/Home";
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import View from "./Newfolders/View";
import Edit from "./Newfolders/Edit";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/"
         element={<Home />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/view/:id" element={<View />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
