import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

export const useExcelData = (filePath) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(filePath);
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setData(json);
      setColumns(json[0] || []);
    };

    fetchData();
  }, [filePath]);

  return { data, columns };
};
