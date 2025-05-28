import { Link } from "@mui/material";
import Footer from "./Footer";

export default function Home() {
    return (
        <div className="homepage-container">

            <header className="welcome-container">
                <h2 className="welcome">Experience the adrenaline of the F1 universe</h2>
            </header>

            <main>
                <div className="homepage-container dark-theme">



                    <div className="carousel-wrapper">

                        <div class="carousel-container">

                            <img src="../img/carousel1.jpg" alt="formula f" />
                            <img src="../img/carousel2.avif" alt="formula f" />
                            <img src="../img/carousel3.avif" alt="formula f" />

                            <img src="../img/carousel1.jpg" alt="formula f" />
                            <img src="../img/carousel2.avif" alt="formula f" />
                            <img src="../img/carousel3.avif" alt="formula f" />

                        </div>
                        {/* <Link target="_blank" top={"https://www.monacograndprixticket.com/formula1monaco/the-circuit-of-monaco"}></Link> */}
                        {/* <a href="https://www.monacograndprixticket.com/formula1monaco/the-circuit-of-monaco"></a> */}

                    </div>

                    <div className="kartice-div">

                        <div><p className="header-h3">The Most Stunning Race Tracks in the World</p></div>

                        <div className="kartice">

                            <div className="kartica">
                                <img src="../img/circuitDeMonaco.jpg" alt="monaco track" srcset="" />
                            </div>

                            <div className="kartica">
                                <img src="../img/circuitDeSilverstone.jpg" alt="monaco track" srcset="" />
                            </div>

                            <div className="kartica">
                                <img src="../img/circuitDeHungaroring.jpg" alt="monaco track" srcset="" />
                            </div>

                            <div className="kartica">
                                <img src="../img/circuitDeSuzuka.jpg" alt="monaco track" srcset="" />
                            </div>

                        </div>

                        {/* <video src="../img/video/formulaVideo2.mp4" controls width="700" autoplay muted></video> */}

                    </div>
                </div>

                <section className="sponsors">
                    <h3>Official Sponsors</h3>
                    <div className="sponsors-logos">
                        <img src="../partners/Amex.png" alt="Sponsor 1" />
                        <img src="../partners/dhl.png" alt="Sponsor 2" />
                        <img src="../partners/Heineken-Outlined.png" alt="Sponsor 3" />
                        <img src="../partners/lenovo.png" alt="Sponsor 4" />
                        <img src="../partners/louis-vuitton.png" alt="Sponsor 5" />
                        <img src="../partners/nestle.png" alt="Sponsor 6" />
                        <img src="../partners/Paramount+.png" alt="Sponsor 7" />
                        <img src="../partners/AWS-GLOBAL.png" alt="Sponsor 8" />

                    </div>

                </section>

            </main>

        </div>
    );
}