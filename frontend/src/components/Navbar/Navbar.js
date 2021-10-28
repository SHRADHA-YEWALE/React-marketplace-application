import { Link } from 'react-router-dom';
import './Navbar.css';
import '../../App.css';


function Navbar() {

    return (
        <div className="navbar">
            <label className="navbarLabel"><b>Marketplace</b></label> &nbsp;&nbsp;&nbsp;
            <div className="hiddenLinks">
                <Link to="/addProduct" className="navbarText">Add Product</Link>
                <Link to="/" className="navbarText">Home</Link>
            </div>

            <div className="rightSide">
                <Link to="/addProduct" className="navbarText">Add Product</Link>
                <Link to="/" className="navbarText">Home</Link>

            </div>
        </div>
    );
}

export default Navbar;
