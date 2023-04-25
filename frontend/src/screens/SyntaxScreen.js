import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, syntax: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function SyntaxScreen() {
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, syntax }, dispatch] = useReducer(reducer, {
    syntax: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/syntaxes/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [slug]);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css"
        />
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
        <script>hljs.highlightAll();</script>
      </Helmet>

      <div class="container px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 align-items-center my-5">
          <div class="col-lg-7">
            <pre>
              <code class="language-html">{syntax.codeExamples}</code>
            </pre>
          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">Синтаксис</h1>
            <div class="syntax-description">
              {syntax.syntaxName.map((paragraph) => (
                <p>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        <div class="card text-white bg-secondary my-5 py-4 text-center">
          <div class="card-body">
            <p class="text-white m-0">{syntax.news}</p>
          </div>
        </div>

        <div class="row gx-4 gx-lg-5">
          <div class="col-md-4 mb-5">
            <div class="card h-100">
              <div class="card-body">
                <h2 class="card-title">Бібліотеки</h2>
                <p class="card-text">{syntax.libraries}</p>
              </div>
              <div class="card-footer">
                <a class="btn btn-primary btn-sm" href="#!">
                  More Info
                </a>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-5">
            <div class="card h-100">
              <div class="card-body">
                <h2 class="card-title">Статті</h2>
                <p class="card-text">{syntax.articles}</p>
              </div>
              <div class="card-footer">
                <a class="btn btn-primary btn-sm" href="#!">
                  More Info
                </a>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-5">
            <div class="card h-100">
              <div class="card-body">
                <h2 class="card-title">Фреймворки</h2>
                <p class="card-text">{syntax.frameworks}</p>
              </div>
              <div class="card-footer">
                <a class="btn btn-primary btn-sm" href="#!">
                  More Info
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SyntaxScreen;
