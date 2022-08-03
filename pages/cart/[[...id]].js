import React, { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from 'react-bootstrap'
import Message from '../../components/Message'
import { addToCart, setCartItemsFromStorage, removeFromCart } from '../../store/cart'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fas from "@fortawesome/free-solid-svg-icons";
import styles from './CartPage.module.scss'


const CartPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart


  let productId = null
  let qty = null
  let routerIsReady = false;

  useEffect(()=>{
    dispatch(setCartItemsFromStorage());
  }, [])

  useEffect(()=>{

    if(!routerIsReady && router.isReady){
      // console.log(router.query)
      // {qty: '0', id: Array(1)} id: ['62dfb0893ff0886be9c40774']qty: "0"[[Prototype]]: Object
      if(router.query.id && router.query.id[0]){
        productId = router.query.id[0]
      }
      if(router.query.qty){
        qty = router.query.qty
      }
      if( productId && qty){
        dispatch(addToCart(productId, qty))
      }
      
      routerIsReady = true;
    }
  },[router.isReady])

  const removeFromCartHandler = (id)=>{
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () =>{
    // console.log('checkout')
    // history.push('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        { cartItems.length === 0 ? 
        (<Message>Your cart is empty <Link href='/'>Go Back</Link></Message>) 
        : 
        (<ListGroup variant='flush'>
          {cartItems.map(item => (
            <ListGroup.Item key={item.product}>
              <Row>
                <Col className={styles.col} md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded/>
                </Col>
                <Col className={styles.col} md={3}>
                  <Link href={`/product/${item.product}`}>{item.name}</Link>
                </Col>
                <Col className={styles.col} md={2}>${item.price}</Col>
                <Col className={styles.col} md={2}>
                  <Form.Control as='select' value={item.qty} onChange={(e)=> dispatch((addToCart(item.product, Number(e.target.value))))}>
                    {[...Array(item.countInStock).keys()].map( i => (<option key={i + 1} value={i + 1} >{ i + 1 }</option>))}
                  </Form.Control>
                </Col>
                <Col className={styles.col} md={2}>
                  <Button type='button' variant='light' onClick={()=>{removeFromCartHandler(item.product)}}>
                    <FontAwesomeIcon icon={fas.faTrash} />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>) }
      </Col>
      <Col md={4}>
            <Card >
              <ListGroup variant="flush">
                <ListGroup.Item  >
                  <h2>Subtotal ({cartItems.reduce((acc, item) => { console.log(item.name,item.qty); return parseInt(acc, 10) +  parseInt(item.qty, 10)}, 0)}) items</h2>
                  ${cartItems.reduce((acc, item)=> acc + item.qty * item.price, 0).toFixed(2)}
                </ListGroup.Item>
                <ListGroupItem>
                  <Button style={{width: '100%'}} type="button" className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed To Checkout</Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
      </Col>
   
    </Row>
  )
}

export default CartPage