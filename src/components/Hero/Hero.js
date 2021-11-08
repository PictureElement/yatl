import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Hero.scss';

function Hero(props) {
  return (
    <section className="hero">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="hero__title h4">{props.title}</h1>
        <ThemeToggle />
      </div>
    </section>
  )
}

export default Hero