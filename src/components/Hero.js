import LightThemeToggle from './LightThemeToggle';
import DarkThemeToggle from './DarkThemeToggle';

function Hero(props) {

    let toggle;

    if(false) {
        toggle = <LightThemeToggle />
    } else {
        toggle = <DarkThemeToggle />
    }

    return (
        <section className="hero">
            <div className="container d-flex justify-content-between align-items-center">
                <h1 className="hero__title h2">{props.title}</h1>
                {toggle}
            </div>
        </section>
    )
}

export default Hero