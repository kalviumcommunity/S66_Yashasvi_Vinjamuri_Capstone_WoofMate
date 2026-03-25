import "./App.css";
import Router from "./components/Router";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
