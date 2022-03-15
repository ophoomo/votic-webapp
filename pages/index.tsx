import type { NextPage } from 'next'
import GroupComponet from '../components/Group'
import Create from '../components/Create'
import Join from '../components/Join'
import MainLayout from '../layouts/main'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAuthState } from '../redux/Selectors'
import { Group } from '../services/group'
import { AuthState } from '../redux/types/authType'
import Swal from 'sweetalert2'

const Home: NextPage = () => {
  
  interface groupStruct {
    id: string
    name: string
  };

  const authStore: AuthState = useSelector(getAuthState);

  const [Data, setData] = useState<Array<groupStruct>>([]);

  const getGroup = async () => {
    const group = new Group();
    await authStore.group.map(async (item) => {
      await group.find(item).then(res => {
        if(res.data.status) {
          setData(prevState => ([...prevState, res.data.data]));
        }
      }).catch(() => {
          Swal.fire({
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: 'เกิดข้อผิดพลาดจากทางเซิฟเวอร์',
          });
      });
    });
  }

  useEffect(() => {
    getGroup();
  }, []);

  return (
    <MainLayout>
      <Navbar />
      <div className='container mt-5'>
        <div className='mb-5'>
          <Join />
          <Create />
        </div>
        <div className='is-flex is-flex-wrap-wrap'>
          {
            Data.length > 0 && Data.map(item => (<GroupComponet key={item.id} id={item.id} name={item.name} />))
          }         
        </div>
      </div>
    </MainLayout>
  )
}

export default Home
