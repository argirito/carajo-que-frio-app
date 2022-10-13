import "./CheckLabel.scss"
import React from "react"

import CheckLineIcon from "remixicon-react/CheckLineIcon"
import CheckDoubleLineIcon from "remixicon-react/CheckDoubleLineIcon"

function CheckLabel({ text }: { text: string }) {
  return (
    <div className="check-label-container">
      <div className="check-label">
        <div className="check-label-icon">
          <CheckLineIcon className="check" />
          <CheckDoubleLineIcon className="check-double" />
        </div>
        <div className="check-label">{text}</div>
      </div>
    </div>
  )
}

export default CheckLabel
