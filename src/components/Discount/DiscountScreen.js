import React, { useEffect, useState, useRef } from "react";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import StarterKit from "@tiptap/starter-kit";
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditor,
} from "mui-tiptap";
//Components
import Loading from "../Loading";
import Filters from "./Filters";

const days = [
  { name: "Pazartesi", _id: 1 },
  { name: "Salı", _id: 2 },
  { name: "Çarşamba", _id: 3 },
  { name: "Perşembe", _id: 4 },
  { name: "Cuma", _id: 5 },
  { name: "Cumartesi", _id: 6 },
  { name: "Pazar", _id: 0 },
];

const DiscountScreen = ({
  isDiscount,
  isCoupon,
  isSurvey,
  isIys,
  isLuck,
  isSupport,
  setShown,
  branches,
  branchId,
  setBranchId,
  dayId,
  setDayId,
  startHour,
  setStartHour,
  endHour,
  setEndHour,
  email,
  setEmail,
  personel,
  setPersonel,
  student,
  setStudent,
  minPayment,
  setMinPayment,
  finalDate,
  setFinalDate,
  code,
  setCode,
  usageAmount,
  setUsageAmount,
  usageFrequency,
  setUsageFrequency,
  index,
  setIndex,
  name,
  setName,
  description,
  setDescription,
  chance,
  setChance,
  discountType,
  setDiscountType,
  minLimit,
  setMinLimit,
  percent,
  setPercent,
  amount,
  setAmount,
  endDate,
  setEndDate,
  productsLoading,
  products,
  productId,
  setProductId,
  onProductsSelected,
  questions,
  setQuestions,
  maxMikelTime,
  setMaxMikelTime,
  setFilters,
  emptyLuck,
  setEmptyLuck,
  onDone,
}) => {
  const rteRef = useRef(null);
  const rteRef1 = useRef(null);

  const [question, setQuestion] = useState("");
  const [qIndex, setQIndex] = useState(0);
  const [type, setType] = useState("1");
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState("");
  const [aIndex, setAIndex] = useState(0);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [contentType, setContentType] = useState(null);

  useEffect(() => {
    if (index === 1 && discountType === "4") {
      onProductsSelected();
    }
  }, [index, discountType]);

  const returnSelecteds = (array, container_array, setArray, bool) => {
    return (
      <div className="selection_row_container">
        {array?.map((i) => {
          return (
            <div className="selection_container">
              <p>
                {bool
                  ? container_array.filter((j) => j._id === i)[0].title.tr
                  : container_array.filter((j) => j._id === i)[0].name}
              </p>
              <img
                src={require("../../images/close_icon.png")}
                height="18"
                width="18"
                onClick={() => {
                  setArray((prev) => prev.filter((j) => j !== i));
                }}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {isDiscount && index === null && (
        <div className="discount_container">
          <div>
            <div className="discount_image_container">
              <img
                src={require("../../images/close_icon.png")}
                height="24"
                width="24"
                onClick={() => {
                  setShown(false);
                }}
              />
            </div>
            <p>Lütfen şube seçiniz.</p>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {"Şube seçiniz"}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id={"Branch"}
                label={"Şube"}
                value={null}
                onChange={(e) => {
                  setBranchId((prev) => {
                    if (!prev.includes(e.target.value)) {
                      return prev.concat([e.target.value]);
                    } else {
                      return prev.filter((i) => i !== e.target.value);
                    }
                  });
                }}
              >
                {branches?.map((branch, index) => (
                  <MenuItem key={index} value={branch._id}>
                    {branch?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {returnSelecteds(branchId, branches, setBranchId)}
            <p>Lütfen Gün seçiniz.</p>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {"Gün seçiniz"}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id={"Day"}
                label={"Gün"}
                value={null}
                onChange={(e) => {
                  setDayId((prev) => {
                    if (!prev.includes(e.target.value)) {
                      return prev.concat([e.target.value]);
                    } else {
                      return prev.filter((i) => i !== e.target.value);
                    }
                  });
                }}
              >
                {days?.map((day, index) => (
                  <MenuItem key={index} value={day._id}>
                    {day?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {returnSelecteds(dayId, days, setDayId)}
            <p>Lütfen başlangıç saatini giriniz.</p>
            <TextField
              margin="none"
              label={"Başlangıç Saati (XX)"}
              value={startHour}
              onChange={(e) => setStartHour(e.target.value)}
              type="number"
              fullWidth
              variant="standard"
              multiline={false}
            />
            <p>Lütfen bitiş saatini giriniz.</p>
            <TextField
              margin="none"
              label={"Bitiş Saati (XX)"}
              value={endHour}
              onChange={(e) => setEndHour(e.target.value)}
              type="number"
              fullWidth
              variant="standard"
              multiline={false}
            />
            <p>Lütfen Email uzantısı giriniz.</p>
            <TextField
              margin="none"
              label={"Email (@xxxxx.xxx)"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              fullWidth
              variant="standard"
              multiline={false}
            />
            <FormControlLabel
              control={
                <Checkbox
                  margin="dense"
                  checked={personel}
                  onChange={(e) => setPersonel(e.target.checked)}
                  fullWidth
                  variant="standard"
                />
              }
              label={"Sadece Personeller"}
            />
            <FormControlLabel
              control={
                <Checkbox
                  margin="dense"
                  checked={student}
                  onChange={(e) => setStudent(e.target.checked)}
                  fullWidth
                  variant="standard"
                />
              }
              label={"Sadece Öğrenciler"}
            />
            <p>Lütfen bakiye yükleme alt baremi giriniz.</p>
            <TextField
              margin="none"
              label={"Minimum yükleme (TL)"}
              value={minPayment}
              onChange={(e) => setMinPayment(e.target.value)}
              type="number"
              fullWidth
              variant="standard"
              multiline={false}
            />
            <p>Lütfen kampanya bitiş tarihi giriniz.</p>
            <TextField
              margin="none"
              label={"Bitiş Tarihi (YYYY-MM-DD)"}
              value={finalDate}
              onChange={(e) => setFinalDate(e.target.value)}
              type="number"
              fullWidth
              variant="standard"
              multiline={false}
            />
          </div>
          <Button
            onClick={() => setIndex(0)}
            color="primary"
            variant="contained"
          >
            Sıradaki
          </Button>
        </div>
      )}
      {isCoupon && index === null && (
        <div className="discount_container">
          <div>
            <div className="discount_image_container">
              <img
                src={require("../../images/close_icon.png")}
                height="24"
                width="24"
                onClick={() => {
                  setShown(false);
                }}
              />
            </div>
            <p>Lütfen kodu giriniz giriniz.</p>
            <TextField
              margin="none"
              label={"Kupon Kodu"}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              type="email"
              fullWidth
              variant="standard"
              multiline={false}
            />
            <p>
              Lütfen kullanım sınırını giriniz. (Toplam kaç kez
              kullanılabilsin?)
            </p>
            <TextField
              margin="none"
              label={"Kullanım sınırı"}
              value={usageAmount}
              onChange={(e) => setUsageAmount(e.target.value)}
              type="number"
              fullWidth
              variant="standard"
              multiline={false}
            />
            <p>
              Lütfen kullanım sıklığını giriniz. (Bir kullanıcı kaç kez
              kullanılabilsin?)
            </p>
            <TextField
              margin="none"
              label={"Kullanım sıklığı"}
              value={usageFrequency}
              onChange={(e) => setUsageFrequency(e.target.value)}
              type="number"
              fullWidth
              variant="standard"
              multiline={false}
            />
            <p>Lütfen şube seçiniz.</p>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {"Şube seçiniz"}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id={"Branch"}
                label={"Şube"}
                value={null}
                onChange={(e) => {
                  setBranchId((prev) => {
                    if (!prev.includes(e.target.value)) {
                      return prev.concat([e.target.value]);
                    } else {
                      return prev.filter((i) => i !== e.target.value);
                    }
                  });
                }}
              >
                {branches?.map((branch, index) => (
                  <MenuItem key={index} value={branch._id}>
                    {branch?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {returnSelecteds(branchId, branches, setBranchId)}
            <p>Lütfen kampanya bitiş tarihi giriniz.</p>
            <TextField
              margin="none"
              label={"Bitiş Tarihi (YYYY-MM-DD)"}
              value={finalDate}
              onChange={(e) => setFinalDate(e.target.value)}
              type="number"
              fullWidth
              variant="standard"
              multiline={false}
            />
          </div>
          <Button
            onClick={() => setIndex(0)}
            color="primary"
            variant="contained"
          >
            Sıradaki
          </Button>
        </div>
      )}
      {isSurvey && index === null && (
        <Filters
          onClose={() => {
            setShown(false);
          }}
          setIndex={setIndex}
          setFilters={setFilters}
          children={
            <div className="discount_container">
              <div>
                <div className="discount_image_container">
                  <img
                    src={require("../../images/close_icon.png")}
                    height="24"
                    width="24"
                    onClick={() => {
                      setShown(false);
                    }}
                  />
                </div>
                {qIndex === 0
                  ? null
                  : questions.map((q, i) => {
                      return (
                        <>
                          <p>
                            {i + 1 + "- "}
                            {q.question}
                          </p>
                          {q.answers.length !== 0 && (
                            <div className="filter_row">
                              {q.answers.map((a, i) => {
                                return (
                                  <Button color="primary" variant="outlined">
                                    {a}
                                  </Button>
                                );
                              })}
                            </div>
                          )}
                        </>
                      );
                    })}
                <p>Lütfen soruyu giriniz.</p>
                <TextField
                  margin="none"
                  label={"Anket sorusu"}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  type="email"
                  fullWidth
                  variant="standard"
                  multiline={false}
                />
                <p>Lütfen tür seçiniz.</p>
                <div className="filter_row">
                  <Button
                    onClick={() => setType("1")}
                    color="primary"
                    variant={type === "1" ? "outlined" : "text"}
                  >
                    Yazı
                  </Button>
                  <Button
                    onClick={() => setType("2")}
                    color="primary"
                    variant={type === "2" ? "outlined" : "text"}
                  >
                    Seçenek
                  </Button>
                </div>
                {type === "2" && (
                  <>
                    <p>Lütfen seçenekleri giriniz.</p>
                    {aIndex === 0
                      ? null
                      : answers.map((a, i) => {
                          return (
                            <p>
                              {i + 1 + "- "}
                              {a}
                            </p>
                          );
                        })}
                    <>
                      <TextField
                        margin="none"
                        label={"Cevap " + (aIndex + 1)}
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        type="email"
                        fullWidth
                        variant="standard"
                        multiline={false}
                      />
                      <div className="filter_row">
                        <Button
                          fullWidth
                          onClick={() => {
                            if (answer !== "") {
                              setAnswers((prev) => prev.concat([answer]));
                              setAIndex((prev) => prev + 1);
                              setAnswer("");
                            }
                          }}
                          color="primary"
                          variant="contained"
                        >
                          Cevap ekle
                        </Button>
                      </div>
                    </>
                  </>
                )}
              </div>
              <div className="filter_row">
                <Button
                  fullWidth
                  onClick={() => {
                    if (
                      question !== "" &&
                      (type !== "2" || answers.length !== 0)
                    ) {
                      setQuestions((prev) =>
                        prev.concat([{ question: question, answers: answers }])
                      );
                      setQuestion("");
                      setType("1");
                      setQIndex((prev) => prev + 1);
                      setAIndex(0);
                      setAnswers([]);
                    }
                  }}
                  color="primary"
                  variant="contained"
                >
                  Soru ekle
                </Button>
                <Button
                  fullWidth
                  onClick={() => {
                    if (questions.length === 0) {
                      alert("Lütfen en az 1 soru ekleyiniz.");
                    } else {
                      setIndex(0);
                    }
                  }}
                  color="primary"
                  variant="contained"
                >
                  Sıradaki
                </Button>
              </div>
            </div>
          }
        />
      )}
      {isIys && (
        <Filters
          onClose={() => {
            setShown(false);
          }}
          setIndex={setIndex}
          setFilters={setFilters}
          children={
            <div className="discount_container">
              <div>
                <div className="discount_image_container">
                  <img
                    src={require("../../images/close_icon.png")}
                    height="24"
                    width="24"
                    onClick={() => {
                      setShown(false);
                    }}
                  />
                </div>
                <p>Lütfen İleti türü seçiniz.</p>
                <div className="discount_type_container">
                  <Button
                    onClick={() => setContentType("1")}
                    color="primary"
                    variant={contentType === "1" ? "outlined" : "text"}
                  >
                    Sms
                  </Button>
                  <Button
                    onClick={() => setContentType("2")}
                    color="primary"
                    variant={contentType === "2" ? "outlined" : "text"}
                  >
                    Email
                  </Button>
                  <Button
                    onClick={() => setContentType("3")}
                    color="primary"
                    variant={contentType === "3" ? "outlined" : "text"}
                  >
                    Bildirim
                  </Button>
                </div>
                {contentType !== null && (
                  <>
                    {contentType !== "1" && (
                      <>
                        <p>Lütfen başlık giriniz.</p>
                        <TextField
                          margin="none"
                          label={"İleti başlığı"}
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          type="email"
                          fullWidth
                          variant="standard"
                          multiline={false}
                        />
                      </>
                    )}
                    <p>Lütfen içerik giriniz.</p>
                    <RichTextEditor
                      ref={rteRef}
                      extensions={[StarterKit]}
                      content=""
                      renderControls={() => (
                        <MenuControlsContainer>
                          <MenuSelectHeading />
                          <MenuDivider />
                          <MenuButtonBold />
                          <MenuButtonItalic />
                        </MenuControlsContainer>
                      )}
                    />
                  </>
                )}
              </div>
              <Button
                onClick={() => {
                  console.log(rteRef.current?.editor?.getHTML());
                  console.log(title, message);
                }}
                color="primary"
                variant="contained"
              >
                Gönder
              </Button>
            </div>
          }
        />
      )}
      {index === 0 && (
        <div className="discount_container">
          <div>
            <div className="discount_image_container">
              <img
                src={require("../../images/close_icon.png")}
                height="24"
                width="24"
                onClick={() => {
                  setIndex(null);
                }}
              />
            </div>
            {isLuck && (
              <FormControlLabel
                control={
                  <Checkbox
                    margin="dense"
                    checked={emptyLuck}
                    onChange={(e) => setEmptyLuck(e.target.checked)}
                    fullWidth
                    variant="standard"
                  />
                }
                label={"Boş Ödül"}
              />
            )}
            <p>Lütfen kampanya ismi giriniz.</p>
            <TextField
              margin="none"
              label={"Kampanya ismi"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="email"
              fullWidth
              variant="standard"
              multiline={false}
            />
            <p>Lütfen kampanya kullanım koşulları giriniz.</p>
            <RichTextEditor
              ref={rteRef1}
              extensions={[StarterKit]}
              content=""
              renderControls={() => (
                <MenuControlsContainer>
                  <MenuSelectHeading />
                  <MenuDivider />
                  <MenuButtonBold />
                  <MenuButtonItalic />
                </MenuControlsContainer>
              )}
            />
            {isLuck && (
              <>
                <p>Lütfen kampanya oranı giriniz.</p>
                <TextField
                  margin="none"
                  label={"Oran"}
                  value={chance}
                  onChange={(e) => setChance(e.target.value)}
                  type="number"
                  fullWidth
                  variant="standard"
                  multiline={false}
                />
              </>
            )}
            <p>Lütfen kampanya türü seçiniz.</p>
            <div className="discount_type_container">
              <Button
                onClick={() => setDiscountType("1")}
                color="primary"
                variant={discountType === "1" ? "outlined" : "text"}
              >
                İndirim
              </Button>
              <Button
                onClick={() => setDiscountType("2")}
                color="primary"
                variant={discountType === "2" ? "outlined" : "text"}
              >
                TL
              </Button>
              <Button
                onClick={() => setDiscountType("3")}
                color="primary"
                variant={discountType === "3" ? "outlined" : "text"}
              >
                Mikel Cup
              </Button>
              <Button
                onClick={() => setDiscountType("4")}
                color="primary"
                variant={discountType === "4" ? "outlined" : "text"}
              >
                Ürün
              </Button>
            </div>
          </div>
          <Button
            onClick={() => {
              if (discountType === "") {
                alert("Lütfen seçim yapınız.");
              } else {
                if (isLuck && emptyLuck) {
                  if (chance === "") {
                    alert("Lütfen Oran bilgisi giriniz.");
                  } else {
                    onDone();
                  }
                } else {
                  if (isLuck && chance === "") {
                    alert("Lütfen Oran bilgisi giriniz.");
                  } else {
                    setDescription(rteRef1.current?.editor?.getHTML());
                    setIndex(1);
                  }
                }
              }
            }}
            color="primary"
            variant="contained"
          >
            Sıradaki
          </Button>
        </div>
      )}
      {index === 1 && (
        <div className="discount_container">
          <div>
            <div className="discount_image_container">
              <img
                src={require("../../images/close_icon.png")}
                height="24"
                width="24"
                onClick={() => {
                  setIndex(null);
                }}
              />
            </div>
            {discountType === "1" && (
              <>
                <p>Lütfen minimum sepet tutarı giriniz.</p>
                <TextField
                  margin="none"
                  label={"Minumum Tutar (TL)"}
                  value={minLimit}
                  onChange={(e) => setMinLimit(e.target.value)}
                  type="number"
                  fullWidth
                  variant="standard"
                  multiline={false}
                />
                <p>Lütfen indirim yüzdesi veya tutarı giriniz.</p>
                <TextField
                  margin="none"
                  label={"İndirim Yüzdesi (%)"}
                  value={percent}
                  onChange={(e) => setPercent(e.target.value)}
                  type="number"
                  fullWidth
                  variant="standard"
                  multiline={false}
                />
                <TextField
                  margin="none"
                  label={"İndirim Miktarı (TL)"}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  fullWidth
                  variant="standard"
                  multiline={false}
                />
              </>
            )}
            {discountType === "2" && (
              <>
                <p>Lütfen hediye tutarı giriniz.</p>
                <TextField
                  margin="none"
                  label={"Miktar (TL)"}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  fullWidth
                  variant="standard"
                  multiline={false}
                />
              </>
            )}
            {discountType === "3" && (
              <>
                <p>Lütfen hediye tutarı giriniz.</p>
                <TextField
                  margin="none"
                  label={"Miktar (Mikel Cup)"}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  fullWidth
                  variant="standard"
                  multiline={false}
                />
                <p>Lütfen Mikel Cup geçerlilik süresi giriniz.</p>
                <TextField
                  margin="none"
                  label={"Süre (Gün)"}
                  value={maxMikelTime}
                  onChange={(e) => setMaxMikelTime(e.target.value)}
                  type="number"
                  fullWidth
                  variant="standard"
                  multiline={false}
                />
              </>
            )}
            {discountType === "4" &&
              (productsLoading ? (
                <Loading />
              ) : (
                <>
                  <p>Lütfen ürün seçiniz.</p>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {"Ürün seçiniz"}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id={"Product"}
                      label={"Ürün"}
                      value={null}
                      onChange={(e) => {
                        setProductId((prev) => {
                          if (!prev.includes(e.target.value)) {
                            return prev.concat([e.target.value]);
                          } else {
                            return prev.filter((i) => i !== e.target.value);
                          }
                        });
                      }}
                    >
                      {products?.map((product, index) => (
                        <MenuItem key={index} value={product._id}>
                          {product?.title?.tr}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {returnSelecteds(productId, products, setProductId, true)}
                  <p>Lütfen indirim yüzdesi veya tutarı giriniz.</p>
                  <TextField
                    margin="none"
                    label={"İndirim Yüzdesi (%)"}
                    value={percent}
                    onChange={(e) => setPercent(e.target.value)}
                    type="number"
                    fullWidth
                    variant="standard"
                    multiline={false}
                  />
                  <TextField
                    margin="none"
                    label={"İndirim Miktarı (TL)"}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    fullWidth
                    variant="standard"
                    multiline={false}
                  />
                </>
              ))}
          </div>
          <Button onClick={onDone} color="primary" variant="contained">
            {isDiscount && "İndirim Ekle"}
            {isCoupon && "Kupon Ekle"}
            {isSurvey && "Anket Ekle"}
            {isLuck && "Şans Ekle"}
            {isSupport && "Hediye Gönder"}
          </Button>
        </div>
      )}
    </>
  );
};

export default DiscountScreen;
