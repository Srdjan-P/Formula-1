import { Link } from "@mui/material";
import Footer from "./Footer";

export default function Home() {
    return (
        <div className="homepage-container">

            <header className="welcome-container">
                <h2 className="welcome">Experience the adrenaline of the F1 universe</h2>
            </header>
            <div className="checkered-board-1">
                {/* <h2 className="checkered-text">Legendary Race Tracks Await</h2> */}
            </div>

            <main>
                <div className="homepage-container dark-theme">



                    {/* <div className="carousel-wrapper">

                        <div className="carousel-container">

                            <img src="../img/carousel1.jpg" alt="formula f" />
                            <img src="../img/carousel2.avif" alt="formula f" />
                            <img src="../img/carousel3.avif" alt="formula f" />

                            <img src="../img/carousel1.jpg" alt="formula f" />
                            <img src="../img/carousel2.avif" alt="formula f" />
                            <img src="../img/carousel3.avif" alt="formula f" />

                        </div>
                       

                    </div> */}

                    <div className="kartice-div">

                        <div><p className="header-h3">The Most Stunning Race Tracks in the World</p></div>

                        <div className="kartice">

                            <div className="kartice">
                                <div className="kartica">
                                    <a href="https://www.formula1.com/en/racing/2024/Monaco.html" target="_blank">
                                        <img src="../img/circuitDeMonaco.jpg" alt="Circuit de Monaco" />
                                    </a>
                                </div>

                                <div className="kartica">
                                    <a href="https://www.formula1.com/en/racing/2024/Great_Britain.html" target="_blank">
                                        <img src="../img/circuitDeSilverstone.jpg" alt="Silverstone Circuit" />
                                    </a>
                                </div>

                                <div className="kartica">
                                    <a href="https://www.formula1.com/en/racing/2024/Hungary.html" target="_blank">
                                        <img src="../img/circuitDeHungaroring.jpg" alt="Hungaroring Circuit" />
                                    </a>
                                </div>

                                <div className="kartica">
                                    <a href="https://www.formula1.com/en/racing/2024/Japan.html" target="_blank">
                                        <img src="../img/circuitDeSuzuka.jpg" alt="Suzuka International Racing Course" />
                                    </a>
                                </div>
                            </div>

                        </div>

                        {/* <video src="../img/video/formulaVideo2.mp4" controls width="700" autoplay muted></video> */}

                    </div>
                </div>

                <div className="checkered-board">
                    {/* <h2 className="checkered-text">Legendary Race Tracks Await</h2> */}
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