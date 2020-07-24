import React, { useState, useEffect } from 'react'; //useState is used without redux
// import data from '../data';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';

function HomeScreen(props) {

    // without redux...1
    // const [products, setProduct] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const category = props.match.params.id ? props.match.params.id : '';

    const productList = useSelector(state => state.productList); // a hook to access the redux store's state
    const { products, loading, error } = productList;
    const dispatch = useDispatch(); //dispatcher
    useEffect(() => {
        dispatch(listProducts());
        // without redux....2
        // const fetchData = async() => {
        //     const {data} = await axios.get("/api/products");
        //     setProduct(data);
        // }
        // fetchData();

        return () => {

        }
    }, [category]) //empty array means that this lines code when didmount

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(listProducts(category, searchKeyword, sortOrder));
    };
    const sortHandler = (e) => {
        setSortOrder(e.target.value);
        dispatch(listProducts(category, searchKeyword, sortOrder));
    };

    return (
        <>
            {category && <h2>{category}</h2>
            }

            <ul className="filter">
                <li>
                    <form onSubmit={submitHandler}>
                        <input
                            name="searchKeyword"
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                        <button type="submit">Search</button>
                    </form>
                </li>
                <li>
                    Sort By{' '}
                    <select name="sortOrder" onChange={sortHandler}>
                        <option value="">Newest</option>
                        <option value="highest">Lowest</option>
                        <option value="lowest">Highest</option>
                    </select>
                </li>
            </ul>
            {
                loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>{error}</div>
                ) : (
                            <ul className="products">
                                {products.map((product) => (
                                    <li key={product._id}>
                                        <div className="product">
                                            <Link to={'/product/' + product._id}>
                                                <img
                                                    className="product-image"
                                                    src={product.image}
                                                    alt="product"
                                                />
                                            </Link>
                                            <div className="product-name">
                                                <Link to={'/product/' + product._id}>{product.name}</Link>
                                            </div>
                                            <div className="product-brand">{product.brand}</div>
                                            <div className="product-price">&#8377;{product.price}</div>
                                            <div className="product-rating">
                                                <Rating
                                                    value={product.rating}
                                                    text={product.numReviews}
                                                />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )
            }
        </>
    );
}
export default HomeScreen;