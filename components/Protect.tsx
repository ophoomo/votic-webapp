import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setExpire, setGender, setGroup, setID, setName } from "../redux/actions/authAction";
import { getAuthState } from "../redux/Selectors";
import { AuthState } from "../redux/types/authType";
import { Auth } from "../services/auth";
import { JWT, Payload } from "../utils/jwt";
import loadingcss from '../styles/loading.module.css';

const Protect: React.FC = ({children}) => {

    const authStore: AuthState = useSelector(getAuthState);
    const dispatch = useDispatch();
    const router = useRouter();

    const [Status, setStatus] = useState(false);

    const checkHaveToken = (): boolean => {
        if (localStorage.hasOwnProperty('token')) {
            return true;
        }
        return false;
    }

    const checkStoreData = (): boolean => {
        if (authStore.id !== '') {
            return true;
        }
        return false;
    }

    const verifyToken = async () => {
        const auth = new Auth();
        await auth.verify().then(res => {
            const jwt = new JWT(localStorage.getItem('token') || '');
            const payload: Payload = jwt.getPayload();
            dispatch(setID(payload.id));
            dispatch(setName(`${res.data.data.firstname} ${res.data.data.lastname}`));
            dispatch(setGroup(res.data.data.group));
            dispatch(setExpire(payload.exp));
            dispatch(setGender(res.data.data.gender));
            setStatus(true);
        }).catch(() => {
            localStorage.removeItem('token');
            router.push('/login');
        });
    }

    useEffect(() => {
        if (checkHaveToken()) {
            if(checkStoreData()) {
                setStatus(true);
            } else {
               verifyToken();
            }
        } else {
            router.push('/login');
        }
    }, []);

    if (!Status) {
        return (
            <div style={{height: '100vh', width: '100%', display: 'flex', justifyContent: 'center',
             alignItems: 'center', flexDirection: 'column'}}>
                <div className={loadingcss.ldsroller}><div></div><div></div><div></div><div></div><div></div><div>
                    </div><div></div><div></div></div>
                <h3 className="title is-3 mt-5">กำลังโหลด</h3>
            </div>
        )
    }

    return ( <> {children} </>)
}

export default Protect


