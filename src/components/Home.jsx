export default function Home() {
    return (
        <div className="homepage">
            <section className="welcome">
                <div className="welcome-content">
                    <h1>Experience the adrenaline of the F1 universe</h1>
                </div>
            </section>

            <div className="checkered-divider">
            </div>
            <section className="homepage-wrapper dark-theme">
                <div className="container">
                    <h2 className="cards-title">The Most Stunning Race Tracks in the World</h2>
                    <div className="cards-flex">
                        <div className="card">
                            <a href="https://www.formula1.com/en/racing/2024/Monaco.html" target="_blank">
                                <div className="card-image">
                                    <img src="../img/circuitDeMonaco.jpg" alt="Circuit de Monaco" />
                                    <div className="card-image-overlay">
                                        <span>Monaco</span>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className="card">
                            <a href="https://www.formula1.com/en/racing/2024/Great_Britain.html" target="_blank">
                                <div className="card-image">
                                    <img src="../img/circuitDeSilverstone.jpg" alt="Silverstone Circuit" />
                                    <div className="card-image-overlay">
                                        <span>Silverstone</span>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className="card">
                            <a href="https://www.formula1.com/en/racing/2024/Hungary.html" target="_blank">
                                <div className="card-image">
                                    <img src="../img/circuitDeHungaroring.jpg" alt="Hungaroring Circuit" />
                                    <div className="card-image-overlay">
                                        <span>Hungaroring</span>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className="card">
                            <a href="https://www.formula1.com/en/racing/2024/Japan.html" target="_blank">
                                <div className="card-image">
                                    <img src="../img/circuitDeSuzuka.jpg" alt="Suzuka International Racing Course" />
                                    <div className="card-image-overlay">
                                        <span>Suzuka</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <div className="checkered-divider"></div>

            <section className="sponsors">
                <div className="container">
                    {/* <h2 className="sponsors-title">Official Sponsors</h2> */}
                    <div className="sponsors-flex">
                        <a className="sponsor-logo" href="https://www.americanexpress.com/" target="_blank">
                            <img src="../partners/Amex.PNG" alt="American Express" />
                        </a>
                        <a className="sponsor-logo" href="https://www.dhl.com/global-en/home.html" target="_blank">
                            <img src="../partners/dhl.PNG" alt="DHL" />
                        </a>
                        <a className="sponsor-logo" href="https://www.heineken.com/global/en/home" target="_blank">
                            <img src="../partners/Heineken-Outlined.PNG" alt="Heineken" />
                        </a>
                        <a className="sponsor-logo" href="https://www.lenovo.com/us/en/" target="_blank">
                            <img src="../partners/lenovo.PNG" alt="Lenovo" />
                        </a>
                        <a className="sponsor-logo" href="https://eu.louisvuitton.com/eng-e1/homepage" target="_blank">
                            <img src="../partners/louis-vuitton.PNG" alt="Louis Vuitton" />
                        </a>
                        <a className="sponsor-logo" href="https://www.nestle.com/" target="_blank">
                            <img src="../partners/nestle.PNG" alt="Nestlé" />
                        </a>
                        <a className="sponsor-logo" href="https://www.paramountplus.com/" target="_blank">
                            <img src="../partners/Paramount+.PNG" alt="Paramount+" />
                        </a>
                        <a className="sponsor-logo" href="https://aws.amazon.com/" target="_blank">
                            <img src="../partners/AWS-GLOBAL.PNG" alt="AWS (Amazon Web Services)" />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}