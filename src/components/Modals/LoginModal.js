import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

const LoginModal = ({
  open,
  onClose,
  password,
  setPassword,
  onSubmit,
  userAttributes,
  language,
}) => {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Kullanıcı Adı"
            type="email"
            fullWidth
            variant="standard"
            {...userAttributes}
          />
          <TextField
            margin="dense"
            id="password"
            label="Şifre"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={setPassword}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmit}>Giriş Yap</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoginModal;
