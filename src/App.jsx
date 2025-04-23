import { Link } from 'react-router-dom';
import './App.css';
import CustomRoutes from './routes/CustomRoutes';
import Background from './components/Background/Background';

function App() {
    return (
        <>
            <Background />
            <div className="app-container">
                <div className="outer-pokedex">
                    <h1 id="pokedex-heading">
                        <Link to='/'>Pokedex</Link>
                    </h1>
                    <CustomRoutes />
                </div>
            </div>
        </>
    );
}

export default App;
