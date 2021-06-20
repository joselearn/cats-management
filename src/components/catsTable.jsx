import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

const CatsTable = (props) => {
  const { onDelete } = props;

  const columns = useMemo(
    () => [
      { path: "name", label: "Name", content: (cat) => <Link to={`/cat/${cat.id}`}>{cat.name}</Link> },
      { path: "breed", label: "Breed" },
      { path: "description", label: "Description" },
      { path: "location", label: "Location" },
      {
        key: "delete",
        content: (cat) => (
          <button onClick={() => onDelete(cat)} className="btn btn-danger btn-sm">
            Delete
          </button>
        ),
      },
    ],
    [onDelete]
  );

  return <Table columns={columns} data={props.cats} sortColumn={props.sortColumn} onSort={props.onSort} />;
};

export default CatsTable;
