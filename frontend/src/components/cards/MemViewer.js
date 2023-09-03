const MemViewer = () => {
  return (
    <>
      <Controls />

      <Results />
    </>
  )
}

const Controls = () => {
  return (
    <div class="p-3">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search for a value..."
        />
        <button class="btn btn-primary" type="button">
          Scan Value
        </button>
      </div>

      <div className="d-flex flex-row align-items-center justify-content-evenly">
        <select class="form-select bg-body" defaultValue={"dword"}>
          <option value="byte">Byte -128 - 127</option>
          <option value="word">Word -32,768 - 32,767</option>
          <option value="dword">Dword -2,147,483,648 - 2,147,483,647</option>
          <option value="qword">
            Qword -9,223,372,036,854,775,808 - 9,223,372,036,854,775,807
          </option>
          <option value="float">Float (variable range)</option>
        </select>
        <span className="text-nowrap ms-2 bg-secondary-subtle p-2 rounded">
          <b>0</b> Values Found
        </span>
      </div>
    </div>
  )
}

const Results = () => {
  return (
    <div className="overflow-auto" style={{ height: "100px" }}>
      <table className="table table-striped table-hover border-top">
        <thead className="bg-secondary-subtle">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Hex Address</th>
            <th scope="col">Hex Data</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>0x0001</td>
            <td>0xA1</td>
            <td>Some Value</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default MemViewer
