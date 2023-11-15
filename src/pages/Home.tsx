import React from 'react';
import Navbar from '../components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import "./Styles/styles.css"



const Home: React.FC = () => {
  return (

      <div className="homepage">
        <header>
        </header>
        
        <main className="homecontent">
          {<p>Welcome</p>}
        </main>
      </div>

  );
};

export default Home;
