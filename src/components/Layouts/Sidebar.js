import { useEffect } from "react";
//Components
import SidebarItem from "./SidebarItem";
//Hooks
import useAuth from "../../hooks/useAuth";
//Constants
import Roles from "../../constants/Roles";

const Sidebar = ({ open, setOpen }) => {
  const { auth } = useAuth();

  useEffect(() => {
    if (open) {
      document.querySelector("#sidebar").classList.add("open");
      document.querySelector("#hamburger-1").classList.add("is-active");
    } else {
      document.querySelector("#sidebar").classList.remove("open");
      document.querySelector("#hamburger-1").classList.remove("is-active");
    }
  }, [open]);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const adminLinks = [
    {
      title: "Üyeler",
      link: "panel",
    },
    {
      title: "Şubeler",
      link: "branches",
    },
    {
      title: "Ürünler",
      link: "products",
    },
    {
      title: "Kampanyalar",
      link: "campaigns",
    },
    {
      title: "Hikayeler",
      link: "stories",
    },
    {
      title: "Bildirimler",
      link: "notifications",
    },
    {
      title: "Siparişler",
      link: "orders",
    },
    {
      title: "Destekler",
      link: "supports",
    },
    {
      title: "Başvurular",
      link: "franchises",
    },
    /*
    {
      title: "Mcoins",
      link: "mcoins",
    },
    */
    {
      title: "Hediye Kartları",
      link: "giftcards",
    },
    {
      title: "İleti Yönetim",
      link: "iys",
    },
    {
      title: "İndirimler",
      link: "discounts",
    },
    {
      title: "Kuponlar",
      link: "coupons",
    },
    {
      title: "Anketler",
      link: "surveys",
    },
    {
      title: "Şanslar",
      link: "lucks",
    },
    //Others will be added here..
  ];

  return (
    <div className="sidebar_container" id="sidebar">
      <h1 className="sidebar_title">Mikel Coffee</h1>
      <div className="hamburger" id="hamburger-1" onClick={handleClick}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>
      <div className="sidebar_items_contaier">
        {auth.roles.includes(Roles.Admin)
          ? adminLinks.map((item) => (
              <SidebarItem item={item} key={item.title} />
            ))
          : null}
      </div>
    </div>
  );
};

export default Sidebar;
