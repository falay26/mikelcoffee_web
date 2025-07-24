import Button from "@mui/material/Button";
//PDFs
import UsersPdf from "../../pdfs/uyeler_sayfasi.pdf";
import BranchesPdf from "../../pdfs/subeler_sayfasi.pdf";
import ProductsPdf from "../../pdfs/urunler_sayfasi.pdf";
import PostsPdf from "../../pdfs/postlar_sayfasi.pdf";
import StoriesPdf from "../../pdfs/hikayeler_sayfasi.pdf";
import OrdersPdf from "../../pdfs/siparisler_sayfasi.pdf";
import SupportsPdf from "../../pdfs/destekler_sayfasi.pdf";
import FranchisesPdf from "../../pdfs/basvurular_sayfasi.pdf";
import GiftCatdsPdf from "../../pdfs/hediyeler_sayfasi.pdf";
import IyssPdf from "../../pdfs/iys_sayfasi.pdf";
import CampaignsPdf from "../../pdfs/kampanyalar_sayfasi.pdf";
import CouponsPdf from "../../pdfs/kuponlar_sayfasi.pdf";
import SurveysPdf from "../../pdfs/anketler_sayfasi.pdf";
import LucksPdf from "../../pdfs/sanslar_sayfasi.pdf";

const PdfReturner = (id) => {
  if (id === "üyeler") {
    return { pdf: UsersPdf, name: "uyeler_sayfasi_sunum.pdf" };
  }
  if (id === "şubeler") {
    return { pdf: BranchesPdf, name: "subeler_sayfasi_sunum.pdf" };
  }
  if (id === "ürünler") {
    return { pdf: ProductsPdf, name: "urunler_sayfasi_sunum.pdf" };
  }
  if (id === "postlar") {
    return { pdf: PostsPdf, name: "postlar_sayfasi_sunum.pdf" };
  }
  if (id === "hikayeler") {
    return { pdf: StoriesPdf, name: "hikayeler_sayfasi_sunum.pdf" };
  }
  if (id === "siparişler") {
    return { pdf: OrdersPdf, name: "siparisler_sayfasi_sunum.pdf" };
  }
  if (id === "destekler") {
    return { pdf: SupportsPdf, name: "destekler_sayfasi_sunum.pdf" };
  }
  if (id === "başvurular") {
    return { pdf: FranchisesPdf, name: "basvurular_sayfasi_sunum.pdf" };
  }
  if (id === "hediye kartları") {
    return { pdf: GiftCatdsPdf, name: "hediye_kartlari_sayfasi_sunum.pdf" };
  }
  if (id === "ileti yonetim") {
    return { pdf: IyssPdf, name: "ileti_yonetim_sayfasi_sunum.pdf" };
  }
  if (id === "kampanyalar") {
    return { pdf: CampaignsPdf, name: "kampanyalar_sayfasi_sunum.pdf" };
  }
  if (id === "kuponlar") {
    return { pdf: CouponsPdf, name: "kuponlar_sayfasi_sunum.pdf" };
  }
  if (id === "anketler") {
    return { pdf: SurveysPdf, name: "anketler_sayfasi_sunum.pdf" };
  }
  if (id === "şanslar") {
    return { pdf: LucksPdf, name: "sanslar_sayfasi_sunum.pdf" };
  }
};

const Navbar = ({ onExcel, page_id }) => {
  const handleDownload = () => {
    let data = PdfReturner(page_id);
    const link = document.createElement("a");
    link.href = data.pdf;
    link.download = data.name;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="navbar_container">
      <Button onClick={handleDownload} color="primary" variant="text">
        Sunum İndir
      </Button>
      <Button onClick={onExcel} color="primary" variant="text">
        Excel İndir
      </Button>
      {/*<Button onClick={onLogoutClick} color="primary" variant="text">
        Çıkış Yap
  </Button>*/}
    </div>
  );
};

export default Navbar;
