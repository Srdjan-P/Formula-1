export default function Home() {
    return (
        <div className="homepage-container">

            <header>

            </header>

            <main content-photos>
                <div className="home-content">

                    <img src="/img/photo1.jpg" alt="photo" className="photo-main" width={800} />

                </div>
            </main>

            <footer className="footer">
                <div className="footer-left">
                    <img src="/img/Logo.png" alt="Logo" className="logo-footer" />
                </div>
                <div className="footer-right">
                    <p>&copy; 2025 All right reserved.</p>
                </div>
            </footer>
        </div>
    );
}