import Link from "next/link";
import { useState } from "react";
import Image from 'next/image'
import logo from '../public/logo.png';
import { useSelector } from "react-redux";
import { getAuthState } from "../redux/Selectors";
import { AuthState } from "../redux/types/authType";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const Navbar: React.VFC = () => {

  const [Status, setStatus] = useState(false);
  const [StatusDropdown, setStatusDropdown] = useState(false);
  

  const authStore: AuthState = useSelector(getAuthState);

  const router = useRouter();

  const Logout = () => {
        Swal.fire({
            icon: 'warning',
            title: 'คำเตือน',
            text: 'คุณต้องการที่จะ ออกจากระบบ ใช่ หรือ ไม่?',
            timer: 10000,
            showConfirmButton: true,
            showCancelButton: true,
            cancelButtonText: 'ไม่',
            confirmButtonText: 'ใช่',
        }).then(result => {
          if (result.isConfirmed) {
            localStorage.removeItem('token');
            router.push('/login');
          }
        });
  }
  
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="container">
      <div className="navbar-brand">
        <a className="navbar-item" href="">
          <Image width={112} height={28} src={logo} />
        </a>
        <a
          role="button"
          onClick={() => setStatus(!Status)}
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>
      <div id="navbarBasicExample" className={`navbar-menu ${Status && 'is-active'}`}>
        <div className="navbar-start">
          <Link href={'/'}>
            <a className="navbar-item">หน้าหลัก</a>
          </Link>
        </div>


      <div className="navbar-end">
        <div className="navbar-item">

          <div onMouseEnter={() => setStatusDropdown(true)} onMouseLeave={() => setStatusDropdown(false)}
           className={`dropdown ${StatusDropdown && 'is-active'}`}>
          <div className="dropdown-trigger">
            <h6  style={{cursor: 'pointer', userSelect: 'none'}} className="title is-6 has-text-success">
              คุณ {authStore.name}
            </h6>
          </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              <Link href='/profile'>
                <a href="#" className="dropdown-item">แก้ไขข้อมูล</a>
              </Link>
              <Link href='/password'>
                <a href="#" className="dropdown-item">เปลื่ยนรหัสผ่าน</a>
              </Link>
              <hr className="dropdown-divider" />
              <a onClick={() => Logout()} href="#" className="dropdown-item">ออกจากระบบ</a>
            </div>
          </div>
        </div>

        </div>
      </div>

      </div>
    </div>
    </nav>
  );
};

export default Navbar;
