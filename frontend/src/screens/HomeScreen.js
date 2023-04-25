import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import data from '../data';
import { Link } from 'react-router-dom';

// import data from '../data';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, syntaxes: action.payload, loading: false };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, syntaxes }, dispatch] = useReducer(reducer, {
    syntaxes: [],
    loading: true,
    error: '',
  });

  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/syntaxes');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title></title>
      </Helmet>
      <header class="masthead">
        <div class="container px-4 px-lg-5 h-100">
          <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
            <div class="col-lg-8 align-self-end">
              <h1 class="text-white font-weight-bold">Навчайся разом з нами</h1>
              <hr class="divider" />
            </div>
            <div class="col-lg-8 align-self-baseline">
              <p class="text-white-75 mb-5">
                це освітній сайт для тих, хто тільки занурився в програмування,
                створений на основі популярного сайту W3Schools.com в перекладі
                українською мовою, адаптований для україномовних користувачів,
                із додатковими матеріалами та поясненнями. Ви також можете
                перейти на{' '}
                <a href="https://w3schoolsua.github.io/index_en.html#gsc.tab=0">
                  англомовну версію сайту
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <section class="page-section bg-primary" id="about">
        <div class="container px-4 px-lg-5">
          <div class="row gx-4 gx-lg-5 justify-content-center">
            <div class="col-lg-8 text-center">
              <h2 class="text-white mt-0">Приєднуйся скоріш до нас!</h2>
              <hr class="divider divider-light" />
              <p class="text-white-75 mb-4">
                Наш сайт містить велику кількість корисної інформації, що
                допоможе вам у процесі програмування. Ви знайдете тут пояснення
                основних понять з різних галузей програмування, роз'яснення
                синтаксису різних мов програмування, приклади коду, а також
                відповіді на часті питання. Наша мета - допомогти вам
                розвиватись як програмісту та зробити процес програмування більш
                простим та зрозумілим.
              </p>
              <Link className="nav-link" to="/signin">
                <a class="btn btn-light btn-xl" href="#services">
                  Приєднатись
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section class="page-section" id="services">
        <div class="container px-4 px-lg-5">
          <h2 class="text-center mt-0">Ви навчитесь</h2>
          <hr class="divider" />
          <div class="row gx-4 gx-lg-5">
            <div class="col-lg-3 col-md-6 text-center">
              <div class="mt-5">
                <div class="mb-2">
                  <i class="bi-gem fs-1 text-primary"></i>
                </div>
                <h3 class="h4 mb-2">HTML</h3>
                <p class="text-muted mb-0">Мова для створення веб-сторінок</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 text-center">
              <div class="mt-5">
                <div class="mb-2">
                  <i class="bi-laptop fs-1 text-primary"></i>
                </div>
                <h3 class="h4 mb-2">CSS</h3>
                <p class="text-muted mb-0">Мова для стилізації веб-сторінок</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 text-center">
              <div class="mt-5">
                <div class="mb-2">
                  <i class="bi-globe fs-1 text-primary"></i>
                </div>
                <h3 class="h4 mb-2">JavaScript</h3>
                <p class="text-muted mb-0">
                  Мова для програмування веб-сторінок
                </p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 text-center">
              <div class="mt-5">
                <div class="mb-2">
                  <i class="bi-heart fs-1 text-primary"></i>
                </div>
                <h3 class="h4 mb-2">SQL</h3>
                <p class="text-muted mb-0">Мова для доступу до баз даних</p>
              </div>
            </div>
          </div>
          <div class="row gx-4 gx-lg-5">
            <div class="col-lg-3 col-md-6 text-center">
              <div class="mt-5">
                <div class="mb-2">
                  <i class="bi-gem fs-1 text-primary"></i>
                </div>
                <h3 class="h4 mb-2">Python</h3>
                <p class="text-muted mb-0">
                  Python можна використовувати на сервері для створення
                  веб-додатків.
                </p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 text-center">
              <div class="mt-5">
                <div class="mb-2">
                  <i class="bi-laptop fs-1 text-primary"></i>
                </div>
                <h3 class="h4 mb-2">ASP</h3>
                <p class="text-muted mb-0">
                  ASP — це платформа розробки для створення вебсторінок.
                </p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 text-center">
              <div class="mt-5">
                <div class="mb-2">
                  <i class="bi-globe fs-1 text-primary"></i>
                </div>
                <h3 class="h4 mb-2">Go</h3>
                <p class="text-muted mb-0">
                  Go використовується для створення комп’ютерних програм
                </p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 text-center">
              <div class="mt-5">
                <div class="mb-2">
                  <i class="bi-heart fs-1 text-primary"></i>
                </div>
                <h3 class="h4 mb-2">Kotlin</h3>
                <p class="text-muted mb-0">
                  Kotlin використовується для розробки програм для Android,
                  серверних програм і багато іншого.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div id="portfolio">
        <div class="container-fluid p-0">
          <div class="row g-0">
            <div class="col-lg-4 col-sm-6">
              <a
                class="portfolio-box"
                href={process.env.PUBLIC_URL + '/images/1fullsize.jpg'}
                title="Project Name"
              >
                <img
                  class="img-fluid"
                  src={process.env.PUBLIC_URL + '/images/1thumbnails.jpg'}
                  alt="..."
                />
                <div class="portfolio-box-caption">
                  <div class="project-category text-white-50">HTML</div>
                  <div class="project-name">
                    HTML - мова гіпертекстової розмітки, призначена для
                    створення вебсторінок. За допомогою html-тегів проводиться
                    розмітка на вебсторінці, за допомогою якої розміщуються
                    різні об'єкти вебдокумента
                  </div>
                </div>
              </a>
            </div>
            <div class="col-lg-4 col-sm-6">
              <a
                class="portfolio-box"
                href={process.env.PUBLIC_URL + '/images/2fullsize.jpg'}
                title="Project Name"
              >
                <img
                  class="img-fluid"
                  src={process.env.PUBLIC_URL + '/images/2thumbnails.jpg'}
                  alt="..."
                />
                <div class="portfolio-box-caption">
                  <div class="project-category text-white-50">JavaScript</div>
                  <div class="project-name">
                    JavaScript (JS) - мова програмування, що застосовується для
                    створення вебсайтів. JavaScript перетворює статичні
                    вебсторінки в динамічні, мінливі та взаємодіючі з
                    користувачем.
                  </div>
                </div>
              </a>
            </div>
            <div class="col-lg-4 col-sm-6">
              <a
                class="portfolio-box"
                href={process.env.PUBLIC_URL + '/images/3fullsize.jpg'}
                title="Project Name"
              >
                <img
                  class="img-fluid"
                  src={process.env.PUBLIC_URL + '/images/3thumbnails.jpg'}
                  alt="..."
                />
                <div class="portfolio-box-caption">
                  <div class="project-category text-white-50">PHP</div>
                  <div class="project-name">
                    PHP - це серверна скриптова мова і потужний інструмент для
                    створення динамічних та інтерактивних веб-сторінок.
                  </div>
                </div>
              </a>
            </div>
            <div class="col-lg-4 col-sm-6">
              <a
                class="portfolio-box"
                href={process.env.PUBLIC_URL + '/images/4fullsize.jpg'}
                title="Project Name"
              >
                <img
                  class="img-fluid"
                  src={process.env.PUBLIC_URL + '/images/4thumbnails.jpg'}
                  alt="..."
                />
                <div class="portfolio-box-caption">
                  <div class="project-category text-white-50">Java</div>
                  <div class="project-name">
                    Java використовується для розробки мобільних додатків,
                    веб-додатків, настільних програм, ігор та багато іншого.
                  </div>
                </div>
              </a>
            </div>
            <div class="col-lg-4 col-sm-6">
              <a
                class="portfolio-box"
                href={process.env.PUBLIC_URL + '/images/5fullsize.jpg'}
                title="Project Name"
              >
                <img
                  class="img-fluid"
                  src={process.env.PUBLIC_URL + '/images/5thumbnails.jpg'}
                  alt="..."
                />
                <div class="portfolio-box-caption">
                  <div class="project-category text-white-50">C++</div>
                  <div class="project-name">
                    С++ використовується для створення комп’ютерних програм і є
                    однією з найпопулярніших мов у розробці ігор
                  </div>
                </div>
              </a>
            </div>
            <div class="col-lg-4 col-sm-6">
              <a
                class="portfolio-box"
                href={process.env.PUBLIC_URL + '/images/6fullsize.jpg'}
                title="Project Name"
              >
                <img
                  class="img-fluid"
                  src={process.env.PUBLIC_URL + '/images/6thumbnails.jpg'}
                  alt="..."
                />
                <div class="portfolio-box-caption p-3">
                  <div class="project-category text-white-50">Node.js</div>
                  <div class="project-name">
                    Node.js — це серверне середовище з відкритим кодом. Node.js
                    дозволяє запускати JavaScript на сервері.
                  </div>
                </div>
              </a>
            </div>
            <section class="page-section" id="contact">
              <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 justify-content-center">
                  <div class="col-lg-8 col-xl-6 text-center">
                    <h2 class="mt-0">Давай починати вже зараз!</h2>
                    <hr class="divider" />
                    <p class="text-muted mb-5">
                      Готовий? Реєструйся і можещ задавти будь-які питання і ми
                      якомого скоріш дамо відповідь!
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomeScreen;
