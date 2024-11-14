import { routersDate, type RouterKeys} from "@/config";
import { useLocation } from "react-router-dom";

function useIsShowMenu() {
    const location = useLocation();
    const key:RouterKeys  = location.pathname.split('/')[1] as RouterKeys;

    console.log('key:', routersDate[key].hasMenu);
    if (!key) {
        return false;
    }
    return routersDate[key].hasMenu;
}

export default useIsShowMenu;