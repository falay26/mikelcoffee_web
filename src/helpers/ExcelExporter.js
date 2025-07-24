import * as XLSX from "xlsx";
import DataFormatter from "./DataFormatter";

const DataConverter = (data, values) => {
  const result = data.map((i) => {
    if (!i) return {};
    return values.reduce((acc, value) => {
      if (value?.doe_type === "not_visible") {
        return acc;
      }
      const title = value.title;
      acc[title] = DataFormatter(
        value.doe_type === undefined || value.doe_type === "is_branch"
          ? i
          : i?.[value?.value] ?? "",
        value.doe_type,
        value.user_title,
        value.value
      );
      return acc;
    }, {});
  });

  console.log(result);

  return result;
};

const ExcelExporter = (data, values) => {
  let new_datas = DataConverter(data, values);
  /*
  const ws = XLSX.utils.json_to_sheet([]);

  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const day = pad(now.getDate());
  const month = pad(now.getMonth() + 1);
  const year = now.getFullYear();
  const hour = pad(now.getHours());
  const minute = pad(now.getMinutes());
  const formattedDateTime = `${day}.${month}.${year} ${hour}:${minute}`;
  const fileName = `Data_${day}.${month}.${year}_${hour}.${minute}.xlsx`;

  XLSX.utils.sheet_add_aoa(
    ws,
    [[`Rapor oluşturulma tarihi: ${formattedDateTime}`]],
    { origin: "A1" }
  );

  XLSX.utils.sheet_add_json(ws, new_datas, {
    origin: "A2",
    header: Object.keys(new_datas[0]),
  });

  const lastRow = new_datas.length + 2;
  XLSX.utils.sheet_add_aoa(ws, [[`TOPLAM: ${new_datas.length} KAYIT`]], {
    origin: `A${lastRow + 1}`,
  });

  const totalCols = Object.keys(new_datas[0]).length;
  const lastRowIndex = lastRow + 1;

  ws["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: totalCols - 1 } },
    {
      s: { r: lastRowIndex - 1, c: 0 },
      e: { r: lastRowIndex - 1, c: totalCols - 1 },
    },
  ];

  const firstCellRef = XLSX.utils.encode_cell({ r: 0, c: 0 });
  const lastCellRef = XLSX.utils.encode_cell({ r: lastRowIndex - 1, c: 0 });

  ws[firstCellRef].s = {
    alignment: { horizontal: "center" },
    font: { bold: true },
  };

  ws[lastCellRef].s = {
    alignment: { horizontal: "center" },
    font: { italic: true },
  };

  ws["!cols"] = Object.keys(new_datas[0]).map((k) => {
    const max = Math.max(
      k.length,
      ...new_datas.map((r) => (r[k] || "").toString().length)
    );
    return { wch: max + 2 };
  });

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, fileName, { cellStyles: true });
  */
};

export default ExcelExporter;
