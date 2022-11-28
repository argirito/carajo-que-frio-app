import './CreditsLabel.scss'

function CreditsLabel({ title, link }: { title: string; link: string }) {
  return (
    <div className="api-credits">
      <div className="api-credits-text">Powered by:</div>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <div className="api-credits-link">{title}</div>
      </a>
    </div>
  )
}

export default CreditsLabel
