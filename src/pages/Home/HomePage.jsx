import './HomePage.css';
import Header from '../../components/Header.jsx';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ProductGrid } from './ProductsGrid.jsx';
export default function HomePage({ cart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
       const getHomeData = async() => {
            const response = await axios.get('/api/products');
            setProducts(response.data);
       }
       getHomeData();
    }, []);

    return (
        <>
            <title>Ecommerce Page</title>
            <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
            <Header cart={cart} />
            <div className="home-page">
             <ProductGrid products={products} />
            </div>
        </>
    );
}