import Toggle from './Toggle';

function Hero(props) {
    return (
        <section className="hero">
            <div className="container d-flex justify-content-between align-items-center">
                <h1 className="hero__title h2">{props.title}</h1>
                <Toggle />
            </div>
        </section>
    )
}

export default Hero
