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
  discount,
  coupon,
  survey,
  iys,
  luck,
  luckOld,
  onPress,
  onBackPress,
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
          Post Ekle
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
      {discount && (
        <Button onClick={onPress} color="primary" variant="text">
          Kampanya Ekle
        </Button>
      )}
      {coupon && (
        <Button onClick={onPress} color="primary" variant="text">
          Kupon Ekle
        </Button>
      )}
      {survey && (
        <Button onClick={onPress} color="primary" variant="text">
          Anket Ekle
        </Button>
      )}
      {iys && (
        <Button onClick={onPress} color="primary" variant="text">
          Yeni ileti
        </Button>
      )}
      {luck && (
        <Button onClick={onPress} color="primary" variant="text">
          Şans Oyunu Ekle
        </Button>
      )}
      {luckOld && (
        <>
          <Button onClick={onBackPress} color="primary" variant="text">
            Geri Dön
          </Button>
          <Button onClick={onPress} color="primary" variant="text">
            Şans Ekle
          </Button>
        </>
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
