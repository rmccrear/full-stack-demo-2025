
import splashImage from "../assets/splash.jpg"


export default function Home({navigate}) {

    return (
        <div>
            <div className="hero">
                <img src={splashImage} alt="splash image" />
            </div>
        </div>
    )
}