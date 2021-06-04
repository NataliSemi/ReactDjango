import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'


function ProductScreen({ match, history }) {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails 

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin 

    const productReviewCreate = useSelector(state => state.productCreate)
    const { loading: loadingProductReview, 
        error: errorProductReview, 
        success: successProductReview 
    } = productReviewCreate

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
        console.log(qty)
    }, [dispatch, match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>

                {loading ?
                    <Loader />
                    : error
                        ? <Message variant='danger'>{error}</Message>
                    :(
                        <div>
                        <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={"#f8e825"}/>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>

                    </ListGroup>

                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock > 0? 'In Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col xs='auto' className='my-1'>
                                            <Form.Control
                                                as="select"
                                                value={qty}
                                                onChange={(e) => setQty(e.target.value)}
                                            >
                                                {
                                                    [...Array(product.countInStock).keys()]
                                                    .map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Button 
                                onClick={addToCartHandler}
                                className='btn-block' 
                                disabled={product.countInStock === 0 } 
                                type='button'>
                                    Add to Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <h4>Reviews</h4>
                    {product.reviews.length === 0 && <Message variant="info">No reviews</Message>}
                    <ListGroup variant='flush'>
                        {product.reviews.map((review) => (
                            
                        ))}

                    </ListGroup>
                </Col>
            </Row>
            </div>
            )
        }
            
        </div>
    )
}

export default ProductScreen
