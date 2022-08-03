import React, { useState, useEffect } from 'react'
// import { Link, useParams } from 'react-router-dom'
import { useRouter } from 'next/router'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap'
import Rating from '../../components/Rating'
import axios from 'axios'
import Link from 'next/link'
import { getProductDetails } from '../../store/productDetails'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader';
import Message from '../../components/Message';


const ProductPage = ({ history }) => {
  const [qty, setQty] = useState(0)

  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const router = useRouter();
  let routerIsReady = false;

  useEffect(()=>{
    if(!routerIsReady && router.isReady){
      dispatch(getProductDetails(router.query.id))
      console.log('router.isReady')
    }
  },[router.isReady])

  const addToCartHandler = () =>{
    router.push(`/cart/${router.query.id}?qty=${qty}`)
  }

  return (
    <>
      <Link href="/" ><a className='btn btn-light my-3'>Go back</a></Link>
      {productDetails.loading ? 
        <Loader/> 
        : 
        productDetails.error ? 
        <Message variant='danger'>{productDetails.error.message}</Message>
        :
        <>
          <Row>
            <Col md={6}>
              <Image src={productDetails.contents.image} alt={productDetails.contents.name} fluid/>
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{productDetails.contents.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={productDetails.contents.rating} text={` ${productDetails.contents.numReviews} reviews`}/>
                </ListGroup.Item>
                <ListGroup.Item>Price: ${productDetails.contents.price}</ListGroup.Item>
                <ListGroup.Item>Description: ${productDetails.contents.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Price:
                      </Col>
                      <Col>
                        <strong>
                        ${productDetails.contents.price}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Status:
                      </Col>
                      <Col>
                        <strong>
                        ${productDetails.contents.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {productDetails.contents.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control as='select' value={qty} onChange={(e)=> setQty(e.target.value)}>
                            {[...Array(productDetails.contents.countInStock).keys()].map( i => (<option key={i + 1} value={i + 1} >{ i + 1 }</option>))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ) }
                  <ListGroupItem>
                    <Button onClick={addToCartHandler} style={{width: '100%'}} className='btn-block' type='button' disabled={productDetails.contents.countInStock === 0}>
                      Add To Cart
                    </Button>
                    
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </> 
      }
      
    </>
    
  )
}

export default ProductPage