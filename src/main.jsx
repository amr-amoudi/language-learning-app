import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from './App';
import NotFound from "./pages/pageNotFound.jsx";
import Lang from "./pages/changeLang.jsx";
import Words from "./pages/words.jsx";
import Start from "./pages/start.jsx";
import Help from "./pages/help.jsx";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="*" element={<NotFound />}/>
            <Route path="/" element={<App/>} />
            <Route path="/change" element={<Lang/>} />
            <Route path="/words" element={<Words/>} />
            <Route path="/start" element={<Start/>} />
            <Route path="/help" element={<Help/>} />
        </Routes>
    </BrowserRouter>
)
