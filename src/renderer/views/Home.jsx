import hero from '../../../assets/Home/hero.jpg';

function Home() {
  return (
    <div className="home">
      <div className="hero-div">
        <img className="hero-img" src={hero} alt="hero" />
      </div>
      <h2>Ingresar</h2>
      <hr />
      <h3>Log de prestamos</h3>
      <code>
        <ul>
          <li>fecha tal de tal</li>
        </ul>
      </code>
    </div>
  );
}

export default Home;
