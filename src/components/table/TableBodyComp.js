import { TableBody, TableRow, TableCell } from "@/components/ui/table";

const TableBodyComp = ({ columns, rows }) => {
  return (
    <TableBody>
      {rows.length > 0 ? (
        rows.map((row, index) => (
          <TableRow key={index}>
            {columns.map((col, colIndex) => (
              <TableCell key={colIndex}>{row[col.name]}</TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns?.length} className="text-center">
            No Data Available
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default TableBodyComp;
