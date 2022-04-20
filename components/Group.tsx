import { useRouter } from "next/router"
import { useState } from "react"

interface dataStruct {
  id: string
  name: string
  member: number
};

const Group: React.VFC<dataStruct> = ({ name, id, member }) => {

  const router = useRouter();

  return (
    <>
    <div onClick={() => router.push('/group/' + id)} className="card product m-2" style={{width: '250px'}}>
      <div className="card-content">
        <h4 className="title is-4 has-text-centered">{ name }</h4>
      </div>
      <footer className="card-footer">
        <div className="ml-auto mr-3">
          <i className="bi bi-person-fill"></i> { member }
        </div>
      </footer>
    </div>
    </>
  )
}

export default Group

