import { Table } from "@/components/ui/table";
import TableHeaderComp from "./TableHeaderComp";
import TableBodyComp from "./TableBodyComp";


const TableData = ({ columns, rows }) => {
  return (
    <div className="mt-6 p-4 bg-gray-800 rounded">

      <Table className="mt-4 border border-gray-700 bg-gray-800">
        <TableHeaderComp columns={columns} />
        <TableBodyComp columns={columns} rows={rows} />
      </Table>
    </div>
  );
};

export default TableData;
