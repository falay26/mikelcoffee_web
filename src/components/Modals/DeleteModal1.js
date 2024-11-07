import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

const DeleteModal1 = ({ open, onClose, onSubmit }) => {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          Kullanıcının personel durumu değişecek. Devam etmek istediğinize emin
          misiniz?
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmit}>Evet</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteModal1;
