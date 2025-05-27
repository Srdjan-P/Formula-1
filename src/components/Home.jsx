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

                        <video src="../img/video/formulaVideo2.mp4" controls width="700" autoplay muted></video>

                    </div>
                </div>
            </main>

        </div>
    );
}