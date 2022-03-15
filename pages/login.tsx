import type { NextPage } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useRef, useState, KeyboardEvent } from 'react';
import Swal from 'sweetalert2';
import MainLayout from '../layouts/main';
import { Auth } from '../services/auth';

const Login: NextPage = () => {

    interface DataStruct {
        username: string
        password: string
    }

    const router = useRouter();

    const Data = useRef<DataStruct>({
        username: '',
        password: ''
    });

    const [Error, setError] = useState({
        username: false,
        password: false
    });

    const onSubmit = () => {
        if(IsEmail('username', Data.current.username) && IsMoreThenTen('password', Data.current.password)) {
            const auth = new Auth();
            auth.login(Data.current.username, Data.current.password).then(res => {
                if (res.data.status) {
                    localStorage.setItem('token', res.data.data.token);
                    router.push('/');
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'คำเตือน',
                        text: res.data.message,
                    });
                }
            }).catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด',
                    text: 'เกิดข้อผิดพลาดจากทางเซิฟเวอร์',
                });
            });
        }
    }

    const validateEmail = (email : string) => {
        return String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const IsNotEmpty = (id: string, value : string) : boolean => {
        if(value != '') {
            setError(prevState => ({...prevState, [id]:false}));
            return true;
        }
        setError(prevState => ({...prevState, [id]:true}));
        (document.getElementById(id) as HTMLInputElement).focus();
        return false;
    }

    const IsEmail = (id : string, value : string) : boolean => {
        if(IsNotEmpty(id, value)) {
            if(validateEmail(value)) {
                setError(prevState => ({...prevState, [id]:false}));
                return true;
            }
        }
        setError(prevState => ({...prevState, [id]:true}));
        (document.getElementById(id) as HTMLInputElement).focus();
        return false;
    }

    const IsMoreThenTen = (id : string, value: string) : boolean => {
        if(IsNotEmpty(id, value)) {
            if(value.length >= 10) {
                setError(prevState => ({...prevState, [id]:false}));
                return true;
            }
        }
        setError(prevState => ({...prevState, [id]:true}));
        (document.getElementById(id) as HTMLInputElement).focus();
        return false;
    }

    const onInputData = (event : ChangeEvent<HTMLInputElement>) => {
        Data.current = {...Data.current, [event.target.id]:event.target.value};
    }

    const onEnter = (event : KeyboardEvent<HTMLElement>) => {
        event.key === 'Enter' && onSubmit();
    }

    const IsError = (status : boolean) : string => {
        return status ? 'is-danger' : '';
    }

    return (
    <MainLayout>
        <div className='is-flex is-justify-content-center is-align-items-center' style={{height: '100vh'}}>
            <div className="card" style={{width: '300px'}}>
                <div className="card-content">
                    <div className='mb-2'>
                        <label className='label' htmlFor="username">ชื่อผู้ใช้งาน</label>
                        <input onKeyDown={onEnter} onChange={onInputData} id="username"
                         autoFocus type="email" placeholder='อีเมลของท่าน' className={`input ${IsError(Error.username)}`} />
                    </div>
                    <div className='mb-2'>
                        <label className='label' htmlFor="password">รหัสผ่าน</label>
                        <input onKeyDown={onEnter} onChange={onInputData} id="password"
                         type="password" placeholder='รหัสผ่านจำนวน 10 ตีวขึ้นไป' className={`input ${IsError(Error.password)}`} />
                    </div>
                    <button onClick={() => onSubmit()} className="button mb-1 is-info is-fullwidth">เข้าสู่ระบบ</button>
                    <Link href={'/register'}>
                        <button className="button is-info is-outlined is-fullwidth">สมัครสมาชิก</button>
                    </Link>
                </div>
            </div>
        </div>
    </MainLayout>
    );
}


export default Login;