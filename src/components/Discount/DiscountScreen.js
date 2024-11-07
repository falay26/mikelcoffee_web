import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
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
  { name: "Pazar", _id: 7 },
];

const DiscountScreen = ({
  isDiscount,
  isCoupon,
  isSurvey,
  isIys,
  isLuck,
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
  minPayment,
  setMinPayment,
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
  onDone,
}) => {
  const [question, setQuestion] = useState("");
  const [qIndex, setQIndex] = useState(0);
  const [type, setType] = useState("1");
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState("");
  const [aIndex, setAIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (index === 1 && discountType === "4") {
      onProductsSelected();
    }
  }, [index, discountType]);

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
                value={branchId}
                onChange={(e) => setBranchId(e.target.value)}
              >
                {branches?.map((branch, index) => (
                  <MenuItem key={index} value={branch._id}>
                    {branch?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <p>Lütfen Gün seçiniz.</p>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {"Gün seçiniz"}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id={"Day"}
                label={"Gün"}
                value={dayId}
                onChange={(e) => setDayId(e.target.value)}
              >
                {days?.map((day, index) => (
                  <MenuItem key={index} value={day._id}>
                    {day?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                value={branchId}
                onChange={(e) => setBranchId(e.target.value)}
              >
                {branches?.map((branch, index) => (
                  <MenuItem key={index} value={branch._id}>
                    {branch?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                          Başka cevap ekle
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
                    if (question !== "") {
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
                  Başka soru ekle
                </Button>
                <Button
                  fullWidth
                  onClick={() => {
                    console.log(questions);
                    setIndex(0);
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
                <p>Lütfen içerik giriniz.</p>
                <TextField
                  margin="none"
                  label={"İleti içeriği"}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  type="email"
                  fullWidth
                  variant="standard"
                  multiline={false}
                />
              </div>
              <Button
                onClick={() => {
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
            <p>Lütfen kampanya ismi giriniz.</p>
            <TextField
              margin="none"
              label={"İndirim ismi"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="email"
              fullWidth
              variant="standard"
              multiline={false}
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
                MCup
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
                setIndex(1);
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
                  label={"Miktar (Mcup)"}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  fullWidth
                  variant="standard"
                  multiline={false}
                />
                <p>Lütfen Mcup geçerlilik süresi giriniz.</p>
                <TextField
                  margin="none"
                  label={"Süre (Gün)"}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
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
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                    >
                      {products?.map((product, index) => (
                        <MenuItem key={index} value={product._id}>
                          {product?.title?.tr}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
            {/* TODO: change title.. */}
            {isDiscount && "İndirim Ekle"}
            {isCoupon && "Kupon Ekle"}
            {isSurvey && "Anket Ekle"}
            {isLuck && "Şans Ekle"}
          </Button>
        </div>
      )}
    </>
  );
};

export default DiscountScreen;
