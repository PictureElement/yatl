import Toggle from './Toggle';

function Hero(props) {
    return (
        <div>
            <section class="hero">
                <div class="container d-flex justify-content-between align-items-center">
                    <h1 class="hero__title h2">{props.title}</h1>
                    <Toggle />
                </div>
            </section>
        </div>
    )
}

export default Hero
