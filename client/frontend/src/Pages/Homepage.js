import React from 'react';
import { Container } from 'semantic-ui-react';
import Carousel from '../components/Carousel/Carousel';
import Events from '../components/Events/Events';
import Info from '../components/Info';
import Map from '../components/Map';
import '../css/main.css'
import '../css/vendor.css'
import '../css/base.css'
import '../css/fonts.css'
import Mapbox from '../Mapbox'
function Homepage() {


    return(
        <div>
            {/* header
   ================================================== */}
            <header id="header" className="row">
                <div className="header-logo">
                    <a href="#">ShareBike</a>
                </div>
                <nav id="header-nav-wrap">
                    <ul className="header-main-nav">
                        <li className="current"><a className="smoothscroll" href="#home" title="home">Home</a></li>
                        <li><a className="smoothscroll" href="#about" title="about">About</a></li>
                        <li><a className="smoothscroll" href="#pricing" title="pricing">Pricing</a></li>
                        <li><a className="smoothscroll" href="#testimonials" title="testimonials">Stations</a></li>
                        <li><a className="smoothscroll" href="#download" title="download">Download</a></li>
                    </ul>
                </nav>
                <a className="header-menu-toggle" href="#"><span>Menu</span></a>
            </header> {/* /header */}
            {/* home
   ================================================== */}
            <section id="home" data-parallax="scroll" data-image-src="images/hero-bg.jpg" data-natural-width={3000} data-natural-height={2000}>
                <div className="overlay" />
                <div className="home-content">
                    <div className="row contents">
                        <div className="home-content-left">
                            <h3 data-aos="fade-up">Bienvenue sur ShareBike</h3>
                            <h1 data-aos="fade-up">
                                REJOIGNEZ LES SHARE BIKERS <br />
                                QUI CHOISISSENT NOTRE APP< br />
                                ET DE CHANGER LEURS VILLES.
                            </h1>
                            <div className="buttons" data-aos="fade-up">
                                <a href="#download" className="smoothscroll button stroke">
                                    <span className="icon-circle-down" aria-hidden="true" />
                                    Download App
                                </a>
                                <a href="http://player.vimeo.com/video/14592941?title=0&byline=0&portrait=0&color=39b54a" data-lity className="button stroke">
                                    <span className="icon-play" aria-hidden="true" />
                                    Watch Video
                                </a>
                            </div>
                        </div>
                        <div className="home-image-right">
                            <img src="images/iphone-app-470.png" srcSet="images/iphone-app-470.png 1x, images/iphone-app-940.png 2x" data-aos="fade-up" />
                        </div>
                    </div>
                </div> {/* end home-content */}
                <ul className="home-social-list">
                    <li>
                        <a href="#"><i className="fa fa-facebook-square" /></a>
                    </li>
                    <li>
                        <a href="#"><i className="fa fa-twitter" /></a>
                    </li>
                    <li>
                        <a href="#"><i className="fa fa-instagram" /></a>
                    </li>
                    <li>
                        <a href="#"><i className="fa fa-youtube-play" /></a>
                    </li>
                </ul>
                {/* end home-social-list */}
                <div className="home-scrolldown">
                    <a href="#about" className="scroll-icon smoothscroll">
                        <span>Scroll Down</span>
                        <i className="icon-arrow-right" aria-hidden="true" />
                    </a>
                </div>
            </section> {/* end home */}
            {/* about
    ================================================== */}
            <section id="about">
                <div className="row about-intro">
                    <div className="col-four">
                        <h1 className="intro-header" data-aos="fade-up">About Our App</h1>
                    </div>
                    <div className="col-eight">
                        <p className="lead" data-aos="fade-up">Les meilleures applications de cyclisme peuvent parfois être difficiles à localiser, car de nouvelles options affluent constamment sur le marché. Heureusement, nous sommes là pour vous fournir la meilleure solution</p>
                    </div>
                </div>
                <div className="row about-features">
                    <div className="features-list block-1-3 block-m-1-2 block-mob-full group">
                        <div className="bgrid feature" data-aos="fade-up">
                            <span className="icon"><i className="icon-window" /></span>
                            <div className="service-content">
                                <h3>Payement sécurisé</h3>
                                <p>Sur place ou via l’application vos payment sont fait sur 2 étapes a l'aide d'un autre serveur dans le cloud.
                                </p>
                            </div>
                        </div> {/* /bgrid */}
                        <div className="bgrid feature" data-aos="fade-up">
                            <span className="icon"><i className="icon-image" /></span>
                            <div className="service-content">
                                <h3>Un systeme de maintenance</h3>
                                <p>Tous les velos sont verifier chaque jour pour garantir un service de haute qualité a nos clients.</p>
                            </div>
                        </div> {/* /bgrid */}
                        <div className="bgrid feature" data-aos="fade-up">
                            <span className="icon"><i className="icon-paint-brush" /></span>
                            <div className="service-content">
                                <h3>Un systeme de direction</h3>
                                <p>Vous aide a naviguer en cas ou vous n’etes pas familiatrise avec l’endroit ou vous circuler.</p>
                            </div>
                        </div> {/* /bgrid */}
                        <div className="bgrid feature" data-aos="fade-up">
                            <span className="icon"><i className="icon-file" /></span>
                            <div className="service-content">
                                <h3>Des stations de velos</h3>
                                <p>Les velos sont maintenues et mis a votre disposition a tous moment.</p>
                            </div>
                        </div> {/* /bgrid */}
                        <div className="bgrid feature" data-aos="fade-up">
                            <span className="icon"><i className="icon-sliders" /></span>
                            <div className="service-content">
                                <h3>Une application mobile</h3>
                                <p>Application mobile cross platform fonctionelle sur tous les systemes d'operations.
                                </p>
                            </div>
                        </div> {/* /bgrid */}
                        <div className="bgrid feature" data-aos="fade-up">
                            <span className="icon"><i className="icon-gift" /></span>
                            <div className="service-content">
                                <h3>Tarif raisonable</h3>
                                <p>Nos tarifs prennent en consideration l'etat economique de tous les tranches d'age.</p>
                            </div>
                        </div> {/* /bgrid */}
                    </div> {/* end features-list */}
                </div> {/* end about-features */}
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Carousel />
                <div className="row about-how">
                    <h1 className="intro-header" data-aos="fade-up">How The App Works?</h1>
                    <div className="about-how-content" data-aos="fade-up">
                        <div className="about-how-steps block-1-2 block-tab-full group">
                            <div className="bgrid step" data-item={1}>
                                <h3>Sign-Up</h3>
                                <p>Créez un compte de la manière qui vous convient, en choisissant vos propres identifiant ou bien via vos compte Google ou Facebook
                                </p>
                            </div>
                            <div className="bgrid step" data-item={2}>
                                <h3>Trouvez la station la plus proche</h3>
                                <p>Où que vous soyez, vous trouverez une liste de stations accessibles pour qu'elle soit le départ de votre trajet
                                </p>
                            </div>
                            <div className="bgrid step" data-item={3}>
                                <h3>Réservez un vélo</h3>
                                <p>Dès que vous êtes à la station la plus proche, choisissez un vélo et réservez le en quelques clics !
                                </p>
                            </div>
                            <div className="bgrid step" data-item={4}>
                                <h3>Retrouvez votre chemin</h3>
                                <p>Grâce à notre système de navigation précis, choisissez un itinéraire idéal, profitez de votre journée et retournez votre vélo dans la station qui vous convient
                                </p>
                            </div>
                        </div>
                    </div> {/* end about-how-content */}
                </div> {/* end about-how */}
                <div className="row about-bottom-image">
                    <img src="images/app-screens-1200.png" srcSet="images/app-screens-600.png 600w,
                        images/app-screens-1200.png 1200w,
                        images/app-screens-2800.png 2800w" sizes="(max-width: 2800px) 100vw, 2800px" alt="App Screenshots" data-aos="fade-up" />
                </div>  {/* end about-bottom-image */}
            </section> {/* end about */}
            {/* pricing
    ================================================== */}
            <section id="pricing">
                <div className="row pricing-content">
                    <div className="col-four pricing-intro">
                        <h1 className="intro-header" data-aos="fade-up">Our Pricing Options</h1>
                        <p data-aos="fade-up">Choisissez le meilleur plan pour vous.
                        </p>
                    </div>
                    <div className="col-eight pricing-table">
                        <div className="row">
                            <div className="col-six plan-wrap">
                                <div className="plan-block" data-aos="fade-up">
                                    <div className="plan-top-part">
                                        <h3 className="plan-block-title">Lite Plan</h3>
                                        <p className="plan-block-price"><sup>$</sup>25</p>
                                        <p className="plan-block-per">Per Month</p>
                                    </div>
                                    <div className="plan-bottom-part">
                                        <ul className="plan-block-features">

                                        </ul>
                                        <a className="button button-primary large" href>Get Started</a>
                                    </div>
                                </div>
                            </div> {/* end plan-wrap */}
                            <div className="col-six plan-wrap">
                                <div className="plan-block primary" data-aos="fade-up">
                                    <div className="plan-top-part">
                                        <h3 className="plan-block-title">Pro Plan</h3>
                                        <p className="plan-block-price"><sup>$</sup>50</p>
                                        <p className="plan-block-per">Per Month</p>
                                    </div>
                                    <div className="plan-bottom-part">
                                        <ul className="plan-block-features">

                                        </ul>
                                        <a className="button button-primary large" href>Get Started</a>
                                    </div>
                                </div>
                            </div> {/* end plan-wrap */}
                        </div>
                    </div> {/* end pricing-table */}
                </div> {/* end pricing-content */}
            </section> {/* end pricing */}
            {/* Testimonials Section
    ================================================== */}
            <div className="row about-how">
                <h1 style={{color:"white"}} className="intro-header" data-aos="fade-up">These are our latest events!</h1>
                <Events />

                {/* end about-how-content */}
            </div>
            <section id="testimonials">
                <div className="row">
                    <div className="col-twelve">
                        <h1 className="intro-header" data-aos="fade-up">Our Stations</h1>
                        <div style={{ height: "100vh", width: "100%" }}>
                            {<Map />}
                        </div>
                    </div>
                </div>
                <div className="row owl-wrap">
                    <div id="testimonial-slider" data-aos="fade-up">
                        <div className="slides owl-carousel">
                            <div>
                                <p>
                                    Your work is going to fill a large part of your life, and the only way to be truly satisfied is
                                    to do what you believe is great work. And the only way to do great work is to love what you do.
                                    If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it.
                                </p>
                                <div className="testimonial-author">
                                    <img src="images/avatars/user-02.jpg" alt="Author image" />
                                    <div className="author-info">
                                        Steve Jobs
                                        <span className="position">CEO, Apple.</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p>
                                    This is Photoshop's version  of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet.
                                    Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem
                                    nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris.
                                </p>
                                <div className="testimonial-author">
                                    <img src="images/avatars/user-03.jpg" alt="Author image" />
                                    <div className="author-info">
                                        John Doe
                                        <span>CEO, ABC Corp.</span>
                                    </div>
                                </div>
                            </div>
                        </div> {/* end slides */}
                    </div> {/* end testimonial-slider */}
                </div> {/* end flex-container */}
            </section> {/* end testimonials */}
            {/* download
    ================================================== */}
            <section id="download">
                <div className="row">
                    <div className="col-full">
                        <h1 className="intro-header" data-aos="fade-up">Download Our App Today!</h1>
                        <p className="lead" data-aos="fade-up">
                        </p>
                        <ul className="download-badges">
                            <li><a href="#" title className="badge-appstore" data-aos="fade-up">App Store</a></li>
                            <li><a href="#" title className="badge-googleplay" data-aos="fade-up">Play Store</a></li>
                        </ul>
                    </div>
                </div>
            </section> {/* end download */}
            {/* footer
    ================================================== */}
            <footer>
                <div className="footer-main">
                    <div className="row">
                        <div className="col-three md-1-3 tab-full footer-info">
                            <div className="footer-logo" />
                            <p>
                            </p>
                            <ul className="footer-social-list">
                                <li>
                                    <a href="#"><i className="fa fa-facebook-square" /></a>
                                </li>
                                <li>
                                    <a href="#"><i className="fa fa-twitter" /></a>
                                </li>
                                <li>
                                    <a href="#"><i className="fa fa-behance" /></a>
                                </li>
                                <li>
                                    <a href="#"><i className="fa fa-dribbble" /></a>
                                </li>
                                <li>
                                    <a href="#"><i className="fa fa-instagram" /></a>
                                </li>
                            </ul>
                        </div> {/* end footer-info */}
                        <div className="col-three md-1-3 tab-1-2 mob-full footer-contact">
                            <h4>Contact</h4>
                            <p>
                                1600 Amphitheatre Parkway<br />
                                Mountain View, CA <br />
                                94043 US<br />
                            </p>
                            <p>
                                someone@ShareBikesite.com <br />
                                Phone: (+63) 555 1212 <br />
                                Fax: (+63) 555 0100
                            </p>
                        </div> {/* end footer-contact */}
                        <div className="col-two md-1-3 tab-1-2 mob-full footer-site-links">
                            <h4>Site Links</h4>
                            <ul className="list-links">
                                <li><a href="#">Home</a></li>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">Terms</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                            </ul>
                        </div> {/* end footer-site-links */}
                        <div className="col-four md-1-2 tab-full footer-subscribe">
                            <h4>Our Newsletter</h4>
                            <div className="subscribe-form">
                                <form id="mc-form" className="group" noValidate="true">
                                    <input type="email" defaultValue name="EMAIL" className="email" id="mc-email" placeholder="Email Address" required />
                                    <input type="submit" name="subscribe" defaultValue="Send" />
                                    <label htmlFor="mc-email" className="subscribe-message" />
                                </form>
                            </div>
                        </div> {/* end footer-subscribe */}
                    </div> {/* /row */}
                </div> {/* end footer-main */}
                <div className="footer-bottom">
                    <div className="row">
                        <div className="col-twelve">
                            <div className="copyright">
                                <span>© Copyright ShareBike 2020.</span>
                                <span>Design by <a href="http://www.styleshout.com/">styleshout</a></span>
                            </div>
                            <div id="go-top">
                                <a className="smoothscroll" title="Back to Top" href="#top"><i className="icon-arrow-up" /></a>
                            </div>
                        </div>
                    </div> {/* end footer-bottom */}
                </div>
            </footer>
            <div id="preloader">
                <div id="loader" />
            </div>
            {/* Java Script
    ================================================== */}
        </div>
    );
    /*return (
      <div className="App">
        <Carousel />
        <Container>
          <Events />
          <Info />
          <Map />
        </Container>
      </div>
    );*/
}

export default Homepage;
