import Wrapper from "../assets/wrappers/Navbar.js";
import { MdMenuOpen } from "react-icons/md";
import Logo from "./Logo.jsx";
import { useDashboardContext } from "../pages/DashboardLayout.jsx";
import { LogoutContainer, ThemeToggle } from "./index.js";

const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <MdMenuOpen />
        </button>
        <div>
          <Logo />
          <h4 className="logo-text">Dashboard</h4>
        </div>
        <div className="btn-container">
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
