import { Header } from "./component/Common/Header";
import { Footer } from "./component/Common/Footer";
import { BrowserRouter } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import RoutesList from "./routes/RoutesList";
import { LanguageProvider } from "./context/LanguageContext";
import { PaginationProvider } from './context/PaginationContext';


function App() {


  return (
    <PaginationProvider>
      <BrowserRouter>
        <LanguageProvider>
            <Header />
            <RoutesList />
            <Footer />
          </LanguageProvider>
      </BrowserRouter>
    </PaginationProvider>
  );
}

export default App;
