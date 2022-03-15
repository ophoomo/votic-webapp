import { useState } from "react"

const Vote: React.VFC = () => {

  const [status, setStatus] = useState(false);

  return (
    <>
    <div className="card mb-2">
      <div className="card-content">
        <h4 className="title is-4">ชื่อหัวข้อโหวต</h4>
      </div>
    </div>
    </>
  )
}

export default Vote

