import { useState, useEffect } from 'react'; // Hooks
import LightThemeToggle from './LightThemeToggle';
import DarkThemeToggle from './DarkThemeToggle';

function Hero(props) {

  const [theme, setTheme] = useState();
  
  useEffect(() => {
    // Set theme to user preference
    if (localStorage.getItem('theme')) {
      if (localStorage.getItem('theme') === 'theme-light') {
        changeThemeToLight();
      } else {
        changeThemeToDark();
      }
    // Otherwise set to default 
    } else {
      changeThemeToLight();
    }
  }, [])

  const changeThemeToLight = () => {
    document.documentElement.classList.remove('theme-dark');
    localStorage.setItem('theme', 'theme-light');
    setTheme('theme-light');
  }

  const changeThemeToDark = () => {
    document.documentElement.classList.add('theme-dark');
    localStorage.setItem('theme', 'theme-dark');
    setTheme('theme-dark');
  }

  let toggle;

  if(theme === 'theme-light') {
    toggle = <LightThemeToggle onClick={changeThemeToDark} />
  } else {
    toggle = <DarkThemeToggle onClick={changeThemeToLight} />
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