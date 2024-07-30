import Button from "@mui/material/Button";

const PageTitle = ({
  title,
  total,
  branch,
  product,
  story,
  campaign,
  is_orders,
  giftcard,
  notification,
  onPress,
}) => {
  return (
    <div className="page_title_container">
      <h1>{title} Sayfası</h1>
      {branch && (
        <Button onClick={onPress} color="primary" variant="text">
          Şube Ekle
        </Button>
      )}
      {product && (
        <Button onClick={onPress} color="primary" variant="text">
          Ürün Ekle
        </Button>
      )}
      {story && (
        <Button onClick={onPress} color="primary" variant="text">
          Hikaye Ekle
        </Button>
      )}
      {campaign && (
        <Button onClick={onPress} color="primary" variant="text">
          Kampanya Ekle
        </Button>
      )}
      {giftcard && (
        <Button onClick={onPress} color="primary" variant="text">
          Hediye Kartı Ekle
        </Button>
      )}
      {notification && (
        <Button onClick={onPress} color="primary" variant="text">
          Bildirim Ekle
        </Button>
      )}
      {total ? (
        <h1>
          Toplam: {total} {is_orders && "TL"}
        </h1>
      ) : null}
    </div>
  );
};

export default PageTitle;
