import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios';
import { listProducts } from '../store/productList';
import { useDispatch, useSelector } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';
import Product from '../components/Product'
import Loader from '../components/Loader';
import Message from '../components/Message';



const HomePage = () => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)


    useEffect( ()=>{
           dispatch(listProducts());
    }, [])



    return (
        <>
            <h1>Latest Products</h1>
            { productList.loading ?  
      
                <Loader/>
                :  productList.error ? 
                <Message variant='danger'>{productList.error.message}</Message> 
                :
                <Row>
                    {
                        productList.products.map(product=>(
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                                <Product product={product}/>
                            </Col>
                        ))
                    }
                </Row>   
            }
             
        </>
    )
}

export default HomePage