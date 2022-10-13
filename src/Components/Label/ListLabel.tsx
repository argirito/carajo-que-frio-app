import ArrowRightS from "remixicon-react/ArrowRightSFillIcon"
import "./ListLabel.scss"

function ListLabel({ text }: { text: string }) {
  return (
    <div className="list-label">
      <div className="list-label-icon">
        <ArrowRightS />
      </div>
      <div className="list-label-text">{text}</div>
    </div>
  )
}

export default ListLabel
