export default function Footer() {
    return (
        <>
            <div className="footer-left">
                <img src="/img/Logo.png" alt="Logo" className="logo-footer" />
            </div>
            <div className="footer-right">
                <p>&copy; 1975-{new Date().getFullYear()} All right reserved.</p>
            </div>
        </>
    );
}