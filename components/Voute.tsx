import { useState } from "react"

interface dataStruct {
  header: string
}

const Vote: React.VFC<dataStruct> = ({header}) => {

  const [status, setStatus] = useState(false);

  return (
    <>
    <div className="card mb-2">
      <div className="card-content">
        <h4 className="title is-4">{header}</h4>
      </div>
    </div>
    </>
  )
}

export default Vote

