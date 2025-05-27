import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function Footer() {
    return (
        <>
            <div className="footer-left">
                <img src="/img/Logo.png" alt="Logo" className="logo-footer" />
            </div>
            <div className="footer-right">
                <p>&copy; 1975-{new Date().getFullYear()} All right reserved.</p>
            </div>
            <div className="social-icons">
                <FacebookIcon />
                <XIcon />
                <InstagramIcon />
                <YouTubeIcon />

            </div>


        </>
    );
}