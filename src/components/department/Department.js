import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Department.css';

/**
 * Þessi component ætti að vera einfaldur í birtingu en taka fall frá foreldri
 * sem keyrir þegar smellt er á fyrirsögn.
 */

export default class Exams extends Component {

  render() {
    const { data, visibleDep, headingClick } = this.props;
    const hello = data.heading === visibleDep ? 
      <thead>
        <tr>
          <td>
            Auðkenni
          </td>
          <td>
            Námskeið
          </td>
          <td>
            Fjöldi
          </td>
          <td>
            Dagssetning
          </td>
        </tr>
      </thead> 
      : null;
    return (
      <section key="department">
       <p className="schoolSelector" onClick={headingClick}>{data.heading === visibleDep? '-' : '+'}{data.heading}</p>
       <table className="testTable">
       {hello}
       <tbody>
        {data.heading === visibleDep && (
          data.tests.map(test => 
            (<tr key={test.name}>
              <td >
                {test.course}
              </td>
              <td >
                {test.name}
              </td>
              <td >
                {test.date}
              </td>
              <td >
                {test.students}
              </td>
            </tr>)
          ))} 
      </tbody>
      </table>
      </section>
    );
  }
}

Exams.propTypes = {
  data: PropTypes.object,
  visibleDep: PropTypes.string,
};
