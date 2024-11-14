import { Outlet } from "react-router-dom";
import Header from "./header";
import Nav from "./menu";
import useIsShowMenu from "@/hooks/useIsShowMenu";
import useIsShowHeader from "@/hooks/useIsShowHeader";

function Layout() {

    const is_show_menu = useIsShowMenu();
    const is_show_header = useIsShowHeader();
    return (
        <div className="layout">
            {is_show_header? (
                <div className="header_wrap">
                <Header />
            </div>) :null
            }
            
            {is_show_menu ? (
                <div className="nav_wrap">
                    <Nav />
                </div>) : null
            }
            <div className="outlet_wrap">
                <Outlet />
            </div>

        </div>

    )


}

export default Layout;