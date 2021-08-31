import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";
import { HotTable } from "@handsontable/react";
import Handsontable from "handsontable";
import "./index.css";
import Apps from "./Apps"

const App = () => {
  const hotSettings = useSelector((state) => state);
  const dispatch = useDispatch();
  const hotTableComponent = useRef(null);

  const hotData = hotSettings.data;
  const isHotData = Array.isArray(hotData);

  const onBeforeHotChange = (changes) => {
    dispatch({
      type: "updateData",
      dataChanges: changes,
    });

    return false;
  };

  const toggleReadOnly = (event) => {
    dispatch({
      type: "updateReadOnly",
      readOnly: event.target.checked,
    });
  };

  return (
    <div>
    <Apps />
      
      <div className="redux-example-container headerComp">
        <div id="example-container">
          <div id="example-preview">
            <div id="toggle-boxes">
              <br />
              <input
                onClick={toggleReadOnly}
                id="readOnlyCheck"
                type="checkbox"
              />
              <label htmlFor="readOnlyCheck">
                 Toggle readOnly for the entire table
              </label>
            </div>
            <br />

            <HotTable
              ref={hotTableComponent}
              beforeChange={onBeforeHotChange}
              settings={hotSettings}
            />
          </div>

          <div id="redux-preview">
            <h3 style={{ marginTop: "70px", color: "black" }}>
              Redux Store Data
            </h3>

            {isHotData && (
              <div className="headerCp">
                <table
                  style={{
                    border: "1px solid #d6d6d6",
                    borderRadius: '10px',
                    margin: "40px",
                    padding: '10px',
                    textAlign: "center",
                    width: "95%",
                  }}
                >
                  <tbody>
                    {hotData.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, i) => (
                          <td key={i}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <table className="headerC" style={{ textAlign: "left" }}>
              <tbody>
                {Object.entries(hotSettings).map(
                  ([name, value]) =>
                    name !== "data" && (
                      <tr key={`${name}${value}`}>
                        <td>
                          <strong>{name}: </strong>
                        </td>
                        <td>{value.toString()}</td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const initialReduxStoreState = {
  data: Handsontable.helper.createSpreadsheetData(10, 26),
  colHeaders: true,
  rowHeaders: true,
  dropdownMenu: true,
  height: "auto",
  licenseKey: "non-commercial-and-evaluation",
};

const updatesReducer = (state = initialReduxStoreState, action) => {
  switch (action.type) {
    case "updateData":
      const newData = [...state.data];

      action.dataChanges.forEach(([row, column, oldValue, newValue]) => {
        newData[row][column] = newValue;
      });

      return {
        ...state,
        data: newData,
      };

    case "updateReadOnly":
      return {
        ...state,
        readOnly: action.readOnly,
      };

    default:
      return state;
  }
};

const reduxStore = createStore(updatesReducer);

ReactDOM.render(
  <Provider store={reduxStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
