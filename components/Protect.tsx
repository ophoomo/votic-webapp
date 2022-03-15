import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setExpire, setGroup, setID, setName } from "../redux/actions/authAction";
import { getAuthState } from "../redux/Selectors";
import { AuthState } from "../redux/types/authType";
import { Auth } from "../services/auth";
import { JWT, Payload } from "../utils/jwt";

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
            <h1>loading</h1>
        )
    }

    return ( <> {children} </>)
}

export default Protect


