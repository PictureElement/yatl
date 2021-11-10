import ThemeToggle from './ThemeToggle';
import './Hero.scss';

function Hero(props) {
  return (
    <section className="hero">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="hero__title h4">{props.title}</h1>
        <div className="d-flex">
          <ThemeToggle />
          <button disabled={props.loading} onClick={props.onLogOut} tooltip="Log out" flow="left" type="button" aria-label="Log out" className="hero__logout-button">
            <svg className="hero__logout-icon" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="18px" viewBox="0 0 24 24" width="18px"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"/></g></svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero