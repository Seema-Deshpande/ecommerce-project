import './HomePage.css';
import Header from '../../components/Header.jsx';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ProductGrid } from './ProductsGrid.jsx';
import { useSearchParams } from 'react-router';

export default function HomePage({ cart , loadCart}) {
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');

    useEffect(() => {
       const getHomeData = async() => {
            const urlPath = search ? `/api/products?search=${search}` : '/api/products';
            const response = await axios.get(urlPath);
            setProducts(response.data);
       }
       getHomeData();
    }, [search]);

    return (
        <>
            <title>Ecommerce Page</title>
            <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
            <Header cart={cart} />
            <div className="home-page">
             <ProductGrid products={products} loadCart={loadCart} />
            </div>
        </>
    );
}