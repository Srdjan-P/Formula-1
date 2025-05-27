import { Link } from "@mui/material";
import Footer from "./Footer";

export default function Home() {
    return (
        <div className="homepage-container">

            <header>
                <div className="header-container">
                    {/* <img className="flag" src="../img/ChecheredFlag.avif" alt="" srcset="" /> */}

                    <div className="welcome-container">
                        <h2 className="welcome">Experience the adrenaline of the F1 universe</h2>

                    </div>

                </div>
            </header>

            <main>
                <div className="homepage-container dark-theme">



                    <div className="home-content">

                        <div class="carousel-container">
                            <img src="../img/carousel1.jpg" alt="formula f" />
                            <img src="../img/carousel2.avif" alt="formula f" />
                            <img src="../img/carousel3.avif" alt="formula f" />
                            <img src="../img/carousel4.jpg" alt="formula f" />
                            <img src="../img/carousel5.jpg" alt="formula f" />
                            <img src="../img/carousel6.png" alt="formula f" />

                        </div>

                    </div>

                    <div className="video-monaco">

                        <div><p>Most Stunning Race Tracks</p></div>

                        <div className="kartice">

                            <div className="kartica1">
                                <img src="../img/circuitDeMonaco.jpg" alt="monaco track" srcset="" />
                                {/* <Link target="_blank" top={"https://www.monacograndprixticket.com/formula1monaco/the-circuit-of-monaco"}></Link> */}
                                {/* <a href="https://www.monacograndprixticket.com/formula1monaco/the-circuit-of-monaco"></a> */}
                            </div>

                            <div className="kartica2">
                                <img src="../img/circuitDeSilverstone.jpg" alt="monaco track" srcset="" />
                            </div>

                            <div className="kartica3">
                                <img src="../img/circuitDeHungaroring.jpg" alt="monaco track" srcset="" />
                            </div>

                            <div className="kartica4">
                                <img src="../img/circuitDeSuzuka.jpg" alt="monaco track" srcset="" />
                            </div>

                            <div className="kartica5">
                                <img src="../img/circuitDeVilleneuve.jpg" alt="monaco track" srcset="" />
                            </div>

                        </div>

                        {/* <video src="../img/video/formulaVideo2.mp4" controls width="700" autoplay muted></video> */}

                    </div>
                </div>
            </main>

        </div>
    );
}