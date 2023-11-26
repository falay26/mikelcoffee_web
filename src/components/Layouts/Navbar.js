import Button from "@mui/material/Button";

const Navbar = () => {
  const onLogoutClick = () => {};

  return (
    <div className="navbar_container">
      <Button onClick={onLogoutClick} color="primary" variant="text">
        Çıkış Yap
      </Button>
    </div>
  );
};

export default Navbar;
