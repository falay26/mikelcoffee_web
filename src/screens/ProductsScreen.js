import React, { useState, useEffect } from "react";
//Components
import PanelContainer from "../components/Layouts/PanelContainer";
import PageTitle from "../components/Admin/PageTitle";
import Table from "../components/Table";
import AddEdit from "../components/AddEdit";
import Loading from "../components/Loading";
//API
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const APIS = {
  get: "/get_all_products",
  add: "/add_product",
  update: "/update_product",
  delete: "/delete_product",
};

const ProductsScreen = () => {
  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const [id, setId] = useState();

  const [category, setCategory] = useState("");
  const [subCategoryTR, setSubCategoryTR] = useState("");
  const [subCategoryEN, setSubCategoryEN] = useState("");
  const [subCategoryGR, setSubCategoryGR] = useState("");
  const [subCategoryAR, setSubCategoryAR] = useState("");
  const [titleTR, setTitleTR] = useState("");
  const [titleEN, setTitleEN] = useState("");
  const [titleGR, setTitleGR] = useState("");
  const [titleAR, setTitleAR] = useState("");
  const [image, setImage] = useState("");
  const [descriptionTR, setDescriptionTR] = useState("");
  const [descriptionEN, setDescriptionEN] = useState("");
  const [descriptionGR, setDescriptionGR] = useState("");
  const [descriptionAR, setDescriptionAR] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsTextTR, setIngredientsTextTR] = useState("");
  const [ingredientsTextEN, setIngredientsTextEN] = useState("");
  const [ingredientsTextGR, setIngredientsTextGR] = useState("");
  const [ingredientsTextAR, setIngredientsTextAR] = useState("");
  const [sizes, setSizes] = useState([]);
  const [online, setOnline] = useState(false);
  const [allergens, setAllergens] = useState([]);
  const [contains, setContains] = useState([]);
  const [coin, setCoin] = useState("");
  const [vegan, setVegan] = useState(false);

  useEffect(() => {
    fetchDatas();
  }, []);

  const fetchDatas = async () => {
    setLoading(true);
    try {
      let parameters = {};
      const response = await axiosPrivate.post(
        APIS.get,
        JSON.stringify(parameters),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (err) {
      setLoading(false);
      // TODO: Errorhandling..
    }
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      let parameters = {
        category_id: category,
        sub_category: {
          tr: subCategoryTR,
          en: subCategoryEN,
          gr: subCategoryGR,
          ar: subCategoryAR,
        },
        title: { tr: titleTR, en: titleEN, gr: titleGR, ar: titleAR },
        image: image,
        description: {
          tr: descriptionTR,
          en: descriptionEN,
          gr: descriptionGR,
          ar: descriptionAR,
        },
        ingredients: ingredients,
        ingredients_text: {
          tr: ingredientsTextTR,
          en: ingredientsTextEN,
          gr: ingredientsTextGR,
          ar: ingredientsTextAR,
        },
        sizes: sizes,
        online: online,
        allergens: allergens,
        contains: contains,
        coin: coin,
        vegan: vegan,
      };
      const response = await axiosPrivate.post(
        APIS.add,
        JSON.stringify(parameters),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setEditOpen(false);
        fetchDatas();
      }
    } catch (err) {
      setLoading(false);
      alert("Bir sorun oluştu, lütfen tekrar deneyiniz.");
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      let parameters = {
        product_id: id,
        category_id: category,
        sub_category: {
          tr: subCategoryTR,
          en: subCategoryEN,
          gr: subCategoryGR,
          ar: subCategoryAR,
        },
        title: { tr: titleTR, en: titleEN, gr: titleGR, ar: titleAR },
        image: image,
        description: {
          tr: descriptionTR,
          en: descriptionEN,
          gr: descriptionGR,
          ar: descriptionAR,
        },
        ingredients: ingredients,
        ingredients_text: {
          tr: ingredientsTextTR,
          en: ingredientsTextEN,
          gr: ingredientsTextGR,
          ar: ingredientsTextAR,
        },
        sizes: sizes,
        online: online,
        allergens: allergens,
        contains: contains,
        coin: coin,
        vegan: vegan,
      };
      const response = await axiosPrivate.post(
        APIS.update,
        JSON.stringify(parameters),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setEditOpen(false);
        fetchDatas();
      }
    } catch (err) {
      setLoading(false);
      alert("Bir sorun oluştu, lütfen tekrar deneyiniz.");
    }
  };

  const deleteHandler = async () => {
    setLoading(true);
    try {
      let parameters = {
        product_id: id,
      };
      const response = await axiosPrivate.post(
        APIS.delete,
        JSON.stringify(parameters),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        fetchDatas();
      }
    } catch (err) {
      setLoading(false);
      alert("Bir sorun oluştu, lütfen tekrar deneyiniz.");
    }
  };

  const resetValues = (item) => {
    if (item !== undefined) {
      setId(item._id);
    }
    setCategory(item === undefined ? "" : item.category_id);
    setSubCategoryTR(item === undefined ? "" : item.sub_category.tr);
    setSubCategoryEN(item === undefined ? "" : item.sub_category.en);
    setSubCategoryGR(item === undefined ? "" : item.sub_category.gr);
    setSubCategoryAR(item === undefined ? "" : item.sub_category.ar);
    setTitleTR(item === undefined ? "" : item.title.tr);
    setTitleEN(item === undefined ? "" : item.title.en);
    setTitleGR(item === undefined ? "" : item.title.gr);
    setTitleAR(item === undefined ? "" : item.title.ar);
    setImage(item === undefined ? "" : item.image);
    setDescriptionTR(item === undefined ? "" : item.description.tr);
    setDescriptionEN(item === undefined ? "" : item.description.en);
    setDescriptionGR(item === undefined ? "" : item.description.gr);
    setDescriptionAR(item === undefined ? "" : item.description.ar);
    setIngredients(item === undefined ? [] : item.ingredients);
    setIngredientsTextTR(item === undefined ? "" : item.ingredients_text.tr);
    setIngredientsTextEN(item === undefined ? "" : item.ingredients_text.en);
    setIngredientsTextGR(item === undefined ? "" : item.ingredients_text.gr);
    setIngredientsTextAR(item === undefined ? "" : item.ingredients_text.ar);
    setSizes(item === undefined ? [] : item.sizes);
    setOnline(item === undefined ? false : item.online);
    setAllergens(item === undefined ? [] : item.allergens);
    setContains(item === undefined ? [] : item.contains);
    setCoin(item === undefined ? "" : item.coin);
    setVegan(item === undefined ? false : item.vegan);
  };

  const ingredientsHandler = (bool, id) => {
    if (bool) {
      setIngredients(() => {
        let new_value = [...ingredients, id];
        return new_value;
      });
    } else {
      setIngredients(() => {
        let new_value = ingredients.filter((item) => item !== id);
        return new_value;
      });
    }
  };

  const sizesHandler = (bool, id) => {
    if (bool) {
      setSizes(() => {
        let new_value = [...sizes, id];
        return new_value;
      });
    } else {
      setSizes(() => {
        let new_value = sizes.filter((item) => item !== id);
        return new_value;
      });
    }
  };

  const allergensHandler = (bool, id) => {
    if (bool) {
      setAllergens(() => {
        let new_value = [...allergens, id];
        return new_value;
      });
    } else {
      setAllergens(() => {
        let new_value = allergens.filter((item) => item !== id);
        return new_value;
      });
    }
  };

  const containsHandler = (bool, id) => {
    if (bool) {
      setContains(() => {
        let new_value = [...contains, id];
        return new_value;
      });
    } else {
      setContains(() => {
        let new_value = contains.filter((item) => item !== id);
        return new_value;
      });
    }
  };

  const values = [
    {
      title: "Kategori",
      value: "category_id",
      not_visible: true,
      type: "choiceinput",
      state: category,
      setState: setCategory,
      options: [
        { _id: "0", title: "Kahve" },
        { _id: "1", title: "İçecekler" },
        { _id: "2", title: "Atıştırmalıklar" },
        { _id: "3", title: "Tatlılar & Dondurma" },
        { _id: "4", title: "Fırın" },
        { _id: "5", title: "Barista" },
        { _id: "6", title: "Parekende" },
      ],
      option_title: "title",
    },
    {
      title: "Alt Kategori (Türkçe)",
      value: "sub_category.tr",
      not_visible: true,
      type: "textinput",
      state: subCategoryTR,
      setState: setSubCategoryTR,
    },
    {
      title: "Alt Kategori (İngilizce)",
      value: "sub_category.en",
      not_visible: true,
      type: "textinput",
      state: subCategoryEN,
      setState: setSubCategoryEN,
    },
    {
      title: "Alt Kategori (Yunanca)",
      value: "sub_category.gr",
      not_visible: true,
      type: "textinput",
      state: subCategoryGR,
      setState: setSubCategoryGR,
    },
    {
      title: "Alt Kategori (Arapça)",
      value: "sub_category.ar",
      not_visible: true,
      type: "textinput",
      state: subCategoryAR,
      setState: setSubCategoryAR,
    },
    {
      title: "İsim (Türkçe)",
      value: "title.tr",
      type: "textinput",
      state: titleTR,
      setState: setTitleTR,
    },
    {
      title: "İsim (İngilizce)",
      value: "title.en",
      not_visible: true,
      type: "textinput",
      state: titleEN,
      setState: setTitleEN,
    },
    {
      title: "İsim (Yunanca)",
      value: "title.gr",
      not_visible: true,
      type: "textinput",
      state: titleGR,
      setState: setTitleGR,
    },
    {
      title: "İsim (Arapça)",
      value: "title.ar",
      not_visible: true,
      type: "textinput",
      state: titleAR,
      setState: setTitleAR,
    },
    {
      title: "Resim",
      value: "image",
      is_image: true,
      type: "imageinput",
      state: image,
      setState: setImage,
    },
    {
      title: "Hakkında (Türkçe)",
      value: "description.tr",
      not_visible: true,
      type: "textinput",
      state: descriptionTR,
      setState: setDescriptionTR,
      multiline: true,
    },
    {
      title: "Hakkında (İngilizce)",
      value: "description.en",
      not_visible: true,
      type: "textinput",
      state: descriptionEN,
      setState: setDescriptionEN,
      multiline: true,
    },
    {
      title: "Hakkında (Yunanca)",
      value: "description.gr",
      not_visible: true,
      type: "textinput",
      state: descriptionGR,
      setState: setDescriptionGR,
      multiline: true,
    },
    {
      title: "Hakkında (Arapça)",
      value: "description.ar",
      not_visible: true,
      type: "textinput",
      state: descriptionAR,
      setState: setDescriptionAR,
      multiline: true,
    },
    {
      title: "İçindekiler",
      value: "ingredients",
      not_visible: true,
      type: "multichoiceinput",
      state: ingredients,
      setState: ingredientsHandler,
      options: [
        { id: 0, title: "Espresso Kahve" },
        { id: 1, title: "Americano" },
        { id: 2, title: "Filtre Kahve" },
        { id: 3, title: "Nescafe" },
        { id: 4, title: "Çikolata Şurubu" },
        { id: 5, title: "Karamela Şurubu" },
        { id: 6, title: "Mocha Dondurma" },
        { id: 7, title: "Vanilyalı Dondurma" },
        { id: 8, title: "Bitki Bazlı Krem Şanti" },
        { id: 9, title: "Krem Şanti" },
        { id: 10, title: "Buz" },
        { id: 11, title: "Su" },
        { id: 12, title: "Çikolata Tozu" },
        { id: 13, title: "Vanilya Aromalı Çikolata" },
        { id: 14, title: "Soğuk Köpüklü Süt" },
        { id: 15, title: "Sıcak Köpüklü Süt" },
        { id: 16, title: "Köpüklü Süt" },
        { id: 17, title: "Tatlandırılmış Süt" },
        { id: 18, title: "Şekerli Yoğunlaştırılmış Süt" },
        { id: 19, title: "Yoğunlaştırılmış Süt" },
        { id: 20, title: "Süt" },
        { id: 21, title: "Süt İçermeyen Süt Köpüğü" },
        { id: 22, title: "Taze Süt" },
      ],
      option_title: "title",
      condition: category === "0",
    },
    {
      title: "İçindekiler Ek Yazısı (Türkçe)",
      value: "ingredients_text.tr",
      not_visible: true,
      type: "textinput",
      state: ingredientsTextTR,
      setState: setIngredientsTextTR,
    },
    {
      title: "İçindekiler Ek Yazısı (İngilizce)",
      value: "ingredients_text.en",
      not_visible: true,
      type: "textinput",
      state: ingredientsTextEN,
      setState: setIngredientsTextEN,
    },
    {
      title: "İçindekiler Ek Yazısı (Yunanca)",
      value: "ingredients_text.gr",
      not_visible: true,
      type: "textinput",
      state: ingredientsTextGR,
      setState: setIngredientsTextGR,
    },
    {
      title: "İçindekiler Ek Yazısı (Arapça)",
      value: "ingredients_text.ar",
      not_visible: true,
      type: "textinput",
      state: ingredientsTextAR,
      setState: setIngredientsTextAR,
    },
    {
      title: "Boyut",
      value: "sizes",
      not_visible: true,
      type: "multichoiceinput",
      state: sizes,
      setState: sizesHandler,
      options: [
        { id: 0, title: "Küçük" },
        { id: 1, title: "Orta" },
        { id: 2, title: "Büyük" },
      ],
      option_title: "title",
      condition: category === "0",
    },
    {
      title: "Getir Ve Yemeksepeti Linkleri",
      value: "online",
      not_visible: true,
      type: "checkbox",
      state: online,
      setState: setOnline,
    },
    {
      title: "Alerjenler",
      value: "allergens",
      not_visible: true,
      type: "multichoiceinput",
      state: allergens,
      setState: allergensHandler,
      options: [
        { id: 0, title: "Soya" },
        { id: 1, title: "Gluten" },
        { id: 2, title: "Laktoz" },
        { id: 3, title: "Yumurta" },
        { id: 4, title: "Süt Ürünleri" },
        { id: 5, title: "Gluten İçeren Hububatlar ve Bunların Ürünleri" },
        { id: 6, title: "Kabuklular ve Bunların Ürünleri" },
        { id: 7, title: "Balıklar ve Bunların Ürünleri" },
        { id: 8, title: "Soya Fasulyeleri ve Bunların Ürünleri" },
        { id: 9, title: "Lupin ve Bunların Ürünler" },
        { id: 10, title: "Yumuşakçalar ve Bunların Ürünleri" },
        { id: 11, title: "Yumurta ve Bunlarla Yapılan Ürünler" },
        { id: 12, title: "Fıstık ve Yer Fıstığı Ürünleri" },
        { id: 13, title: "Süt ve Süt Ürünleri" },
        { id: 14, title: "Fındık" },
        { id: 15, title: "Kereviz ve Bunların Ürünleri" },
        { id: 16, title: "Hardal ve Bunların Ürünleri" },
        { id: 17, title: "Kükürtdioksit & Sülfitler" },
        { id: 18, title: "Soya Tohumları ve Bunların Ürünleri" },
      ],
      option_title: "title",
      condition: true,
    },
    {
      title: "İçerebilir",
      value: "contains",
      not_visible: true,
      type: "multichoiceinput",
      state: contains,
      setState: containsHandler,
      options: [
        { id: 0, title: "Soya" },
        { id: 1, title: "Gluten" },
        { id: 2, title: "Laktoz" },
        { id: 3, title: "Yumurta" },
        { id: 4, title: "Süt Ürünleri" },
        { id: 5, title: "Gluten İçeren Hububatlar ve Bunların Ürünleri" },
        { id: 6, title: "Kabuklular ve Bunların Ürünleri" },
        { id: 7, title: "Balıklar ve Bunların Ürünleri" },
        { id: 8, title: "Soya Fasulyeleri ve Bunların Ürünleri" },
        { id: 9, title: "Lupin ve Bunların Ürünler" },
        { id: 10, title: "Yumuşakçalar ve Bunların Ürünleri" },
        { id: 11, title: "Yumurta ve Bunlarla Yapılan Ürünler" },
        { id: 12, title: "Fıstık ve Yer Fıstığı Ürünleri" },
        { id: 13, title: "Süt ve Süt Ürünleri" },
        { id: 14, title: "Fındık" },
        { id: 15, title: "Kereviz ve Bunların Ürünleri" },
        { id: 16, title: "Hardal ve Bunların Ürünleri" },
        { id: 17, title: "Kükürtdioksit & Sülfitler" },
        { id: 18, title: "Soya Tohumları ve Bunların Ürünleri" },
      ],
      condition: true,
      option_title: "title",
    },
    {
      title: "Mikel Coin",
      value: "coin",
      type: "textinput",
      state: coin,
      setState: setCoin,
    },
    {
      title: "Vegan",
      value: "vegan",
      not_visible: true,
      type: "checkbox",
      state: vegan,
      setState: setVegan,
    },
    {
      title: "Düzenle/Sil",
      value: null,
      is_edit: true,
    },
  ];

  return (
    <PanelContainer>
      {loading ? (
        <Loading />
      ) : editOpen ? (
        <AddEdit
          goBack={() => {
            setEditOpen(false);
          }}
          values={values}
          edit={edit}
          onEditPress={handleAdd}
          onUpdatePress={handleUpdate}
        />
      ) : (
        <>
          <PageTitle
            title={"Ürünler"}
            product={true}
            total={data.length}
            onPress={() => {
              resetValues();
              setEdit(true);
              setEditOpen(true);
            }}
          />
          <Table
            values={values}
            data={data}
            loading={false}
            onEdit={(item) => {
              resetValues(item);
              setEdit(false);
              setEditOpen(true);
            }}
            onDelete={deleteHandler}
            setId={setId}
          />
        </>
      )}
    </PanelContainer>
  );
};

export default ProductsScreen;
