import React, { Component } from 'react'

/**
 * NoRecord
 * @howManyCol how many fieldName you got?
 */

class NoRecord extends Component {
  render() {
    return (
      <tr>
        <td colSpan={this.props.howManyCol} className="text-left text-muted"><small>暂无数据</small></td>
      </tr>
    )
  }
}

export default NoRecord;