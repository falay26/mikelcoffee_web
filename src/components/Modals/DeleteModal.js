import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

const DeleteModal = ({
  open,
  onClose,
  onSubmit,
}) => {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          Silme işlemi geri alınamayacaktır. Devam etmek istediğinize emin misiniz?
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmit}>Evet</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteModal;
