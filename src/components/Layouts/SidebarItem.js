import { NavLink, useLocation } from "react-router-dom";

const SidebarItem = ({ item }) => {
  const location = useLocation();

  return (
    <div key={item.title} className="sidebar_item_container">
      <NavLink
        to={`/${item.link}`}
        key={item.title}
        className={
          location.pathname === "/" + item.link
            ? "capitalize_selected"
            : "capitalize"
        }
      >
        {item.title}
      </NavLink>
    </div>
  );
};

export default SidebarItem;
