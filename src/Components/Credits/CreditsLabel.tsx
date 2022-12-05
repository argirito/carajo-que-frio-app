import './CreditsLabel.scss'

function CreditsLabel({
  title,
  link,
  secondLink,
  secondTitle
}: {
  title: string
  link: string
  secondLink?: string
  secondTitle?: string
}) {
  return (
    <div className="api-credits">
      <div className="api-credits-text">Powered by:</div>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <div className="api-credits-link">{title}</div>
      </a>
      {secondLink && (
        <>
          <div className="api-credits-text">and</div>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <div className="api-credits-link">{secondTitle}</div>
          </a>
        </>
      )}
    </div>
  )
}

export default CreditsLabel
