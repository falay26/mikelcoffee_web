const MikelCupHandler = (mikel_cups) => {
  let number = 0;
  let now = new Date().getTime();
  mikel_cups.map((i) => {
    if (i.end_time > now) {
      number += parseInt(i.amount);
    }
  });
  return number;
};

const DataFormatter = (data, type, user_title, valval) => {
  let final_data = "";
  if (!data) return "";
  if (type === "is_phone") {
    final_data =
      "+90 " +
      data.substring(0, 3) +
      " " +
      data.substring(3, 6) +
      " " +
      data.substring(6, 8) +
      " " +
      data.substring(8, 10);
  } else if (type === "is_gender") {
    final_data = data === "0" ? "Bilinmiyor" : data === "1" ? "Kadın" : "Erkek";
  } else if (type === "is_category") {
    const category_returner = (id) => {
      if (id === "1") {
        return "Kahve";
      }
      if (id === "2") {
        return "İçecekler";
      }
      if (id === "3") {
        return "Atıştırmalıklar";
      }
      if (id === "4") {
        return "Tatlılar & Dondurma";
      }
      if (id === "5") {
        return "Fırın";
      }
      if (id === "6") {
        return "Barista";
      }
      if (id === "7") {
        return "Parekende";
      }
    };
    final_data = category_returner(data);
  } else if (type === "is_branch") {
    final_data = data?.branch_info?.[0]?.name;
  } else if (type === "is_experience") {
    if (data === "1") {
      final_data = "Tecrübem var";
    } else {
      final_data = "Tecrübem yok";
    }
  } else if (type === "is_expense") {
    if (data === "0") {
      final_data = "6.000.000 TL";
    } else if (data === "1") {
      final_data = "10.000.000 TL";
    } else {
      final_data = "10.000.000 TL üstü";
    }
  } else if (type === "is_subject") {
    const subject_returner = (id) => {
      if (id === "0") {
        return "Genel";
      }
      if (id === "1") {
        return "Hizmet Kalitesi";
      }
      if (id === "2") {
        return "Mikel Mobil Uygulaması";
      }
      if (id === "3") {
        return "Mikel Websitesi";
      }
      if (id === "4") {
        return "Ürün Hakkında";
      }
      if (id === "5") {
        return "Mağaza Geribildirimi";
      }
    };
    final_data = subject_returner(data);
  } else if (type === "is_user") {
    if (data.length !== 0) {
      if (user_title === "phone") {
        let formatted_phone_number =
          "+90 " +
          data[0][user_title].substring(0, 3) +
          " " +
          data[0][user_title].substring(3, 6) +
          " " +
          data[0][user_title].substring(6, 8) +
          " " +
          data[0][user_title].substring(8, 10);
        final_data = formatted_phone_number;
      } else {
        final_data = data[0][user_title];
      }
    } else {
      final_data = "Bilgi Yok";
    }
  } else if (type === "is_payment_type") {
    if (data === "cash") {
      final_data = "Uygulama";
    } else if (data === "coffee_point") {
      final_data = "Mikel Cup";
    } else if (data === "mcoin") {
      final_data = "Mikel Cup";
    } else if (data === "birthday") {
      final_data = "DG İçeceği";
    } else if (data === "campaign") {
      final_data = "Kampanya";
    } else if (data === "coupon") {
      final_data = "Kupon";
    } else if (data === "balance") {
      final_data = "Bakiye Yüklemesi";
    } else if (data === "register") {
      final_data = "Kasa";
    } else {
      final_data = "Bilinmiyor";
    }
  } else if (type === "is_discount_type") {
    const subject_returner = (id) => {
      if (id === "1") {
        return "İndirim";
      }
      if (id === "2") {
        return "TL";
      }
      if (id === "3") {
        return "Mikel Cup";
      }
      if (id === "4") {
        return "Ürün";
      }
    };
    final_data = subject_returner(data);
  } else if (type === "is_luck_type") {
    const subject_returner = (id) => {
      if (id === "1") {
        return "Kazı Kazan";
      }
      if (id === "2") {
        return "Çark";
      }
      if (id === "3") {
        return "Salla Kazan";
      }
    };
    final_data = subject_returner(data);
  } else if (type === "is_birth") {
    final_data = data?.split("T")[0];
  } else if (type === "is_cash") {
    final_data = data.toFixed(2);
  } else if (type === "is_mikel_cup") {
    final_data = MikelCupHandler(data);
  } else if (type === "is_product_category") {
    const subject_returner = (id) => {
      if (id === "0") {
        return "Kahve";
      }
      if (id === "1") {
        return "İçecekler";
      }
      if (id === "2") {
        return "Atıştırmalıklar";
      }
      if (id === "3") {
        return "Tatlılar & Dondurma";
      }
      if (id === "4") {
        return "Fırın";
      }
      if (id === "5") {
        return "Barista";
      }
      if (id === "6") {
        return "Parekende";
      }
    };
    final_data = subject_returner(data);
  } else if (type === "is_check_price") {
    final_data = JSON?.parse(data).summary.unpaid_amount + " TL";
  } else if (type === "is_check_date") {
    final_data = JSON?.parse(data).business_date;
  } else if (type === "is_discount_users") {
    final_data = data.length;
  } else if (type === "is_bool") {
    final_data = data === true ? "+" : "-";
  } else {
    final_data = valval?.includes(".")
      ? data?.[valval?.split(".")?.[0]]?.[valval?.split(".")?.[1]]
      : data?.[valval];
  }
  return final_data;
};

export default DataFormatter;
