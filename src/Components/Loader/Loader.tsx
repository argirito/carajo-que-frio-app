import './Loader.scss'

function Loader() {
  return (
    <div className="loader-container">
      <img
        className="loader-gif"
        src={require(`../../Images/loading.gif`)}
        alt=""
      />
    </div>
  )
}

export default Loader
