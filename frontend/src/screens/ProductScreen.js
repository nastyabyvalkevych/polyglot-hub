import axios from 'axios';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { toast } from 'react-toastify';
import { useRouteMatch } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_PRODUCT':
      return { ...state, product: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreateReview: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreateReview: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false };
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  let reviewsRef = useRef();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  const [{ loading, error, product, loadingCreateReview }, dispatch] =
    useReducer(reducer, {
      product: [],
      loading: true,
      error: '',
    });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    navigate('/cart');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!comment || !rating) {
      toast.error('Please enter comment and rating');
      return;
    }
    try {
      const { data } = await axios.post(
        `/api/products/${product._id}/reviews`,
        { rating, comment, name: userInfo.name },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Review submitted successfully');
      product.reviews.unshift(data.review);
      product.numReviews = data.numReviews;
      product.rating = data.rating;
      dispatch({ type: 'REFRESH_PRODUCT', payload: product });
      window.scrollTo({
        behavior: 'smooth',
        top: reviewsRef.current.offsetTop,
      });
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'CREATE_FAIL' });
    }
  };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div class="container mt-5">
      <div class="row">
        <div class="col-lg-8">
          <article>
            <header class="mb-4">
              <h1 class="fw-bolder mb-1">Welcome to {product.name}!</h1>

              <div class="text-muted fst-italic mb-2">
                Posted on {product.createdAt} by Polyglot Hub
              </div>

              <a
                class="badge bg-secondary text-decoration-none link-light"
                href="#!"
              >
                {product.category}
              </a>
            </header>

            <figure class="mb-4">
              <img
                className="img-large"
                src={selectedImage || product.image}
                alt={product.name}
              ></img>
            </figure>

            <section class="mb-5">
              <h2 class="fw-bolder mb-4 mt-5">Опис</h2>
              <p class="fs-5 mb-4">{product.description}</p>
              <h2 class="fw-bolder mb-3">Чи варто навчатись даної мови?</h2>
              <div class="accordion mb-5 mb-xl-0" id="accordionExample2">
                <div class="accordion-item">
                  <h3 class="accordion-header" id="headingOne">
                    <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne2"
                      aria-expanded="true"
                      aria-controls="collapseOne2"
                    >
                      Плюси
                    </button>
                  </h3>
                  <div
                    class="accordion-collapse collapse show"
                    id="collapseOne2"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample2"
                  >
                    <div class="accordion-body">
                      {product.pros.map((paragraph) => (
                        <p>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h3 class="accordion-header" id="headingTwo">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo2"
                      aria-expanded="false"
                      aria-controls="collapseTwo2"
                    >
                      Мінуси
                    </button>
                  </h3>
                  <div
                    class="accordion-collapse collapse"
                    id="collapseTwo2"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample2"
                  >
                    <div class="accordion-body">
                      {product.cons.map((paragraph) => (
                        <p>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <h2 class="fw-bolder mb-4 mt-5">Призначення</h2>
              <p class="fs-5 mb-4">{product.purpose}</p>
            </section>
          </article>

          <section class="mb-5">
            <h2 ref={reviewsRef}>Коментарі</h2>
            <div className="mb-3">
              {product.reviews.length === 0 && (
                <MessageBox>Поки ніхто не залишив коментар...</MessageBox>
              )}
            </div>
            <ListGroup>
              {product.reviews.map((review) => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <div class="card-body">
              {userInfo ? (
                <form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="rating">
                    <p></p>
                    <Form.Select
                      aria-label="Rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="1">1- Poor</option>
                      <option value="2">2- Fair</option>
                      <option value="3">3- Good</option>
                      <option value="4">4- Very good</option>
                      <option value="5">5- Excelent</option>
                    </Form.Select>
                  </Form.Group>
                  <FloatingLabel
                    controlId="floatingTextarea"
                    label="Comments"
                    className="mb-3"
                  >
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </FloatingLabel>

                  <div className="mb-3">
                    <Button disabled={loadingCreateReview} type="submit">
                      Відправити
                    </Button>
                    {loadingCreateReview && <LoadingBox></LoadingBox>}
                  </div>
                </form>
              ) : (
                <MessageBox>
                  Будь ласка{' '}
                  <Link to={`/signin?redirect=/product/${product.slug}`}>
                    зареєструйтесь
                  </Link>{' '}
                  , щоб писати коментарі
                </MessageBox>
              )}
            </div>
          </section>
        </div>

        <div class="col-lg-4">
          <div class="card mb-4">
            <div class="card-header">Деталі</div>
            <div class="card-body">
              <div class="input-group">
                <Col md={3}>
                  <a href={`/syntax/${product.slug}`}>Інформація</a>
                </Col>
              </div>
            </div>
          </div>

          <div class="card mb-4">
            <div class="card-header">{product.name}</div>
            <div class="card-body">
              <p>Засновник : {product.developers}</p>
              <p>Дата релізу : {product.releaseDate}</p>
              <p>Версії : {product.versions}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductScreen;
