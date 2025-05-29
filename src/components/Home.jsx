export default function Home() {
    return (
        <div className="homepage-container">

            <header className="welcome-container">
                <h2 className="welcome">Experience the adrenaline of the F1 universe</h2>
            </header>
            <div className="checkered-board-1">
            </div>
            <main>
                <div className="homepage-container dark-theme">
                    <div className="cards-div">
                        <div><p className="header-h3">The Most Stunning Race Tracks in the World</p></div>
                        <div className="cards">
                            <div className="card">
                                <a href="https://www.formula1.com/en/racing/2024/Monaco.html" target="_blank">
                                    <img src="../img/circuitDeMonaco.jpg" alt="Circuit de Monaco" />
                                </a>
                            </div>

                            <div className="card">
                                <a href="https://www.formula1.com/en/racing/2024/Great_Britain.html" target="_blank">
                                    <img src="../img/circuitDeSilverstone.jpg" alt="Silverstone Circuit" />
                                </a>
                            </div>

                            <div className="card">
                                <a href="https://www.formula1.com/en/racing/2024/Hungary.html" target="_blank">
                                    <img src="../img/circuitDeHungaroring.jpg" alt="Hungaroring Circuit" />
                                </a>
                            </div>

                            <div className="card">
                                <a href="https://www.formula1.com/en/racing/2024/Japan.html" target="_blank">
                                    <img src="../img/circuitDeSuzuka.jpg" alt="Suzuka International Racing Course" />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="checkered-board"></div>


                <section className="sponsors">
                    <h3>Official Sponsors</h3>
                    <div className="sponsors-logos">
                        <a href="https://www.americanexpress.com/" target="_blank">
                            <img src="../partners/Amex.png" alt="American Express" />
                        </a>
                        <a href="https://www.dhl.com/global-en/home.html" target="_blank">
                            <img src="../partners/dhl.png" alt="DHL" />
                        </a>
                        <a href="https://www.heineken.com/global/en/home" target="_blank">
                            <img src="../partners/Heineken-Outlined.png" alt="Heineken" />
                        </a>
                        <a href="https://www.lenovo.com/us/en/" target="_blank">
                            <img src="../partners/lenovo.png" alt="Lenovo" />
                        </a>
                        <a href="https://eu.louisvuitton.com/eng-e1/homepage" target="_blank">
                            <img src="../partners/louis-vuitton.png" alt="Louis Vuitton" />
                        </a>
                        <a href="https://www.nestle.com/" target="_blank">
                            <img src="../partners/nestle.png" alt="Nestlé" />
                        </a>
                        <a href="https://www.paramountplus.com/" target="_blank">
                            <img src="../partners/Paramount+.png" alt="Paramount+" />
                        </a>
                        <a href="https://aws.amazon.com/" target="_blank">
                            <img src="../partners/AWS-GLOBAL.png" alt="AWS (Amazon Web Services)" />
                        </a>
                    </div>


                </section>

            </main>

        </div>
    );
}