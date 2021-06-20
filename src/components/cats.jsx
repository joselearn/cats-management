import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Pagination from "./common/pagination";
import CatsTable from "./catsTable";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";

import { removeCat } from "../store/reducers/cat-reducer";

class Cats extends Component {
  state = {
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "name", order: "asc " },
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleDelete = (cat) => {
    this.props.deleteCat(cat.id);
    toast.success("Cat deleted successfully");
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    let filtered = [...this.props.cats];
    if (searchQuery)
      filtered = this.props.cats.filter(
        (m) =>
          m.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.breed.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.location.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const cats = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: cats };
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { length: count } = this.props.cats;

    if (count === 0) return <p>There are no cats in the "database".</p>;

    const { totalCount, data: cats } = this.getPagedData();

    return (
      <div className="row">
        <div className="col">
          <Link to="cat/new" className="btn btn-primary btn-small" style={{ marginBottom: 20 }}>
            New Cat
          </Link>
          <p>Showing {totalCount} cats in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <CatsTable cats={cats} sortColumn={sortColumn} onLike={this.handleLike} onDelete={this.handleDelete} onSort={this.handleSort} />
          <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cats: state.cats,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteCat: (catId) => dispatch(removeCat(catId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cats);
