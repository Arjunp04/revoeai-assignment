import { TableHeader, TableRow, TableHead } from "@/components/ui/table";

const TableHeaderComp = ({ columns }) => {
  return (
    <TableHeader>
      <TableRow className="bg-gray-200 text-white">
        {columns?.map((col, index) => (
          <TableHead key={index}>{col.name}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default TableHeaderComp;
