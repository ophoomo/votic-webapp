import { useRouter } from "next/router"
import { useState } from "react"

interface dataStruct {
  id: string
  name: string
};

const Group: React.VFC<dataStruct> = ({ name, id }) => {

  const router = useRouter();

  return (
    <>
    <div onClick={() => router.push('/group/' + id)} className="card product m-2" style={{width: '300px'}}>
      <div className="card-content">
        <h4 className="title is-4">{ name }</h4>
      </div>
    </div>
    </>
  )
}

export default Group

