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
  const [subCategory, setSubCategory] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsText, setIngredientsText] = useState("");
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
        sub_category: subCategory,
        title: title,
        image: image,
        description: description,
        ingredients: ingredients,
        ingredients_text: ingredientsText,
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
        sub_category: subCategory,
        title: title,
        image: image,
        description: description,
        ingredients: ingredients,
        ingredients_text: ingredientsText,
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
    setSubCategory(item === undefined ? "" : item.sub_category);
    setTitle(item === undefined ? "" : item.title);
    setImage(item === undefined ? "" : item.image);
    setDescription(item === undefined ? "" : item.description);
    setIngredients(item === undefined ? [] : item.ingredients);
    setIngredientsText(item === undefined ? "" : item.ingredients_text);
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
      title: "Alt Kategori",
      value: "sub_category",
      not_visible: true,
      type: "textinput",
      state: subCategory,
      setState: setSubCategory,
    },
    {
      title: "İsim",
      value: "title",
      type: "textinput",
      state: title,
      setState: setTitle,
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
      title: "Hakkında",
      value: "description",
      not_visible: true,
      type: "textinput",
      state: description,
      setState: setDescription,
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
      title: "İçindekiler Ek Yazısı",
      value: "ingredients_text",
      not_visible: true,
      type: "textinput",
      state: ingredientsText,
      setState: setIngredientsText,
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
