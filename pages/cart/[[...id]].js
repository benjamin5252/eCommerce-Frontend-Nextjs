import React, { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../../components/Message'
import { addToCart, setCartItemsFromStorage } from '../../store/cart'
import { useRouter } from 'next/router'


const CartPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  let routerIsReady = false;

  useEffect(()=>{
    dispatch(setCartItemsFromStorage());
  }, [])

  useEffect(()=>{
    if(!routerIsReady && router.isReady){
      console.log(router.query)
      routerIsReady = true;
    }
  },[router.isReady])

  return (
    <div>CartPage</div>
  )
}

export default CartPage