import React, { Component } from "react";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import NoRecord from "./NoRecord";
import ImageButton from "./ImageButton";
import "./ImageButton";
import "./ListView.css";

/**
 * ListView
 * @onPageChange (already proper format)
 * @title
 * @fieldnames [title of arr]
 * @showAll show all
 * @onSearch
 * @hideHeader
 */
class ListView extends Component {
  state = {
    isLess: true
  };

  handlePageChange = page => {
    if (this.props.onPageChange) this.props.onPageChange(page);
  };

  handleSubmit = keywords => {
    if (this.props.onSearch) this.props.onSearch(keywords);
  };

  handleClear = () => {
    if (this.props.onSearch) this.props.onSearch(null);
  };

  showMore = () => {
    this.setState(states => ({ isLess: !states.isLess }));
  };

  renderList = (list = []) => {
    if (!this.props.totalCount) {
      const cols = this.props.fieldNames.length;
      return <NoRecord howManyCol={cols} />;
    }
    if (this.state.isLess) {
      return list.slice(0, 5).map(item => item);
    }
    return list.map(item => item);
  };

  async componentDidMount() {
    if (this.props.showAll) this.setState({ isLess: false });
  }

  render() {
    /** @data field
     * {fieldNames, color} = props
     */
    const renderFieldNames = (names = []) => {
      return names.map((name, key) => (
        <th scope="col" key={key} className="text-dark text-left">
          {name}
        </th>
      ));
    };

    return (
      <div className="table-responsive rounded shadow-sm bg-white">
        {!this.props.hideHeader && (
          <section
            className="d-flex justify-content-between 
        p-3 shadow-sm"
          >
            <h6 className="d-block d-flex align-items-center">{this.props.title}</h6>
            {this.props.onSearch && (
              <div>
                <SearchBar
                  placeholder={this.props.placeholder || "搜索"}
                  name="search"
                  onSubmit={this.handleSubmit}
                  onClearClick={this.handleClear}
                />
              </div>
            )}
          </section>
        )}
        <table className="table mb-0">
          <thead>
            <tr>{renderFieldNames(this.props.fieldNames)}</tr>
          </thead>
          <tbody className="st-break-word">{this.renderList(this.props.children)}</tbody>
        </table>
        <div className="d-flex flex-column shadow-sm p-2" style={{ minHeight: "40px" }}>
          {this.state.isLess && this.props.totalCount > 5 && (
            <ImageButton
              outerClassName={"w-100 p-2"}
              icon={<i className="fas fa-angle-down fa-2x text-secondary" style={{ opacity: 0.8 }} />}
              onClick={() => this.showMore()}
            />
          )}
          {!this.state.isLess && <Pagination onPageChange={this.handlePageChange} count={this.props.totalCount} />}
        </div>
      </div>
    );
  }
}

export default ListView;
