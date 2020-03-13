import React, { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import TagService from "../../services/tag.service";
import axios from "axios";
import Moment from "react-moment";
import {
  MDBDataTable,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBModal,
  MDBBtn,
  MDBModalHeader,
  MDBModalFooter,
  MDBModalBody,
  MDBDropdownItem,
  MDBInput,
  MDBDropdownToggle,
  MDBDropdown,
  MDBDropdownMenu,
  MDBBadge,
  MDBCard
} from "mdbreact";
// import Moment from "react-moment";

class TagManagementPage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  state = {
    data: [],
    visible: false,
    visible2: false,
    visible3: false,
    status: "",
    currId: "",
    title: "",
    loading: false
  };
  showModal = () => {
    this.setState({ visible: true });
  };
  showModal2 = () => {
    this.setState({ visible2: true });
  };
  showModal3 = () => {
    this.setState({ visible3: true });
  };

  handleIdtoUpdate(id) {
    this.showModal2();
    this.setState({ currId: id });
    console.log(this.state.currId);
  }

  handleIdtoChange(id, title) {
    this.showModal3();
    this.setState({ currId: id });
    this.setState({ title: title });
  }

  handleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleCancel = () => {
    this.setState({ visible: false });
    this.setState({ visible2: false });
    this.setState({ visible3: false });
  };

  componentDidMount() {
    const url = "http://localhost:8003/api/v1/tag/getAll";
    axios.get(url).then(res => {
      console.log(res.data);
      this.setState({ data: res.data.content });
      this.setState({ loading: true });
    });
  }

  handleSubmit = e => {
    let id = "1";
    console.log(this.state.title);
    let titles = this.state.title;
    let active = true;
    let tag = {
      id: id,
      title: titles,
      active: active
    };
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    console.log(tag);
    const url = "http://localhost:8003/api/v1/tag";
    axios.post(url, tag, config).then(res => {
      console.log(tag);
      this.setState({ visible: false });
      this.setState({ status: "", currId: "", title: "" });
    });
  };

  handleSubmitPUT = e => {
    let id = this.state.currId;
    console.log(this.state.title);
    let titles = this.state.title;
    let active = true;
    let tag = {
      id: id,
      title: titles,
      active: active
    };
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    console.log(tag);
    const url = "http://localhost:8003/api/v1/tag";
    axios.put(url, tag, config).then(res => {
      console.log(tag);
      this.setState({ visible2: false });
      this.setState({ status: "", currId: "", title: "" });
    });
  };

  handleSubmitUpdate = e => {
    let id = this.state.currId;
    console.log(this.state.title);
    let titles = this.state.title;
    let ac = this.state.status;
    let status = false;
    if (ac === "Active") {
      status = true;
    } else if (ac === "Deactive") {
      status = false;
    }
    let tag = {
      id: id,
      title: titles,
      active: status
    };
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    console.log(tag);
    const url = "http://localhost:8003/api/v1/tag/status";
    axios.put(url, tag, config).then(res => {
      console.log(tag);
      this.setState({ visible3: false });
      this.setState({ status: "", currId: "", title: "" });
    });
  };

  renderTab(arr) {
    return arr.map(({ id, title, createdAt, updatedAt, active }) => {
      return {
        rows: [
          {
            id: id,
            title: title,
            createdAt: (
              <Moment format="MM/DD/YYYY HH:mm:ss">{createdAt}</Moment>
            ),
            updatedAt: (
              <Moment format="MM/DD/YYYY HH:mm:ss">{updatedAt}</Moment>
            ),
            active: (<MDBBadge color="primary">{active}</MDBBadge>),
            update: (
              <MDBBtn
                onClick={e => this.handleIdtoUpdate(id)}
                key
                color="blue"
                size="sm"
              >
                Update
              </MDBBtn>
            ),
            status: (
              <MDBBtn
                onClick={e => this.handleIdtoChange(id, title)}
                color="purple"
                size="sm"
              >
                ChangeStatus
              </MDBBtn>
            )
          }
        ]
      };
    });
  }

  render() {
    const { data } = this.state;

    //
    data.map((dat, index) => {
      if (dat.active === true) {
        dat.active = "Enable";
      } else if (dat.active === false) {
        dat.active = "Deactive";
      }
    });

    //
    const { visible } = this.state;
    const { visible2 } = this.state;
    const { visible3 } = this.state;
    const { currId } = this.state;
    const { loading } = this.state;
    const datamax = {
      columns: [
        {
          label: "ID",
          field: "id",
          width: "10%",
          sort: "asc"
        },
        {
          label: "Title",
          field: "title",
          width: "30%",
          sort: "asc"
        },
        {
          label: "Date of Creation",
          field: "createdAt",
          width: "10%",
          sort: "asc"
        },

        {
          label: "Last Updated Date",
          field: "updatedAt",
          width: "10%",
          sort: "asc"
        },

        {
          label: "Status",
          field: "active",
          width: "10%",
          sort: "asc"
        },

        {
          label: "Action",
          field: "update",
          width: "10%"
        },
        {
          label: "Change Status",
          field: "status",
          width: "10%"
        }
      ],
      rows: []
    };

    for (let i = 0; i < data.length; i++) {
      datamax.rows.push(this.renderTab(data)[i].rows[0]);
    }

    console.log(datamax);
    return (
      <AdminLayout>
        <MDBContainer>
          <MDBCard>
            <MDBRow type="flex" justify="start">
              <MDBCol span={21}>
                <h1>Tags</h1>
                <h3>Manager Tags</h3>
              </MDBCol>
            </MDBRow>
            <br />
            <br />
            <hr className="my-5" />
            <div>
              <MDBBtn
                className="mr-md-n8"
                rounded
                onClick={e => this.showModal(e)}
              >
                Add Tags
              </MDBBtn>
            </div>

            <MDBModal isOpen={visible}>
              <MDBModalHeader
                className="text-center"
                titleClass="w-100 font-weight-bold"
                toggle={e => this.showModal(e)}
              >
                Add New Tag
              </MDBModalHeader>
              <MDBModalBody>
                <form className="mx-3 grey-text">
                  <MDBInput
                    label="Type Tag Title"
                    icon="fas fa-hashtag"
                    value={this.state.title}
                    onChange={e => this.handleChange(e)}
                    validate
                    error="wrong"
                    success="right"
                  />
                </form>
              </MDBModalBody>
              <MDBModalFooter className="justify-content-center">
                <MDBBtn onClick={e => this.handleSubmit(e)}>Submit</MDBBtn>

                <MDBBtn onClick={e => this.handleCancel(e)}>Cancel</MDBBtn>
              </MDBModalFooter>
            </MDBModal>

            <MDBModal isOpen={visible2}>
              <MDBModalHeader
                className="text-center"
                titleClass="w-100 font-weight-bold"
                toggle={e => this.showModal2(e)}
              >
                Update Tag
              </MDBModalHeader>
              <MDBModalBody>
                <form className="mx-3 grey-text">
                  <MDBInput
                    label="ID:"
                    value={this.state.currId}
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Type Tag Title"
                    icon="fas fa-hashtag"
                    value={this.state.title}
                    onChange={e => this.handleChange(e)}
                    validate
                    error="wrong"
                    success="right"
                  />
                </form>
              </MDBModalBody>
              <MDBModalFooter className="justify-content-center">
                <MDBBtn onClick={e => this.handleSubmitPUT(e)}>Submit</MDBBtn>

                <MDBBtn onClick={e => this.handleCancel(e)}>Cancel</MDBBtn>
              </MDBModalFooter>
            </MDBModal>

            <MDBModal isOpen={visible3}>
              <MDBModalHeader
                className="text-center"
                titleClass="w-100 font-weight-bold"
                toggle={e => this.showModal3(e)}
              >
                Update Tag Status
              </MDBModalHeader>
              <MDBModalBody>
                <form className="mx-3 grey-text">
                  <MDBInput
                    label="ID:"
                    value={this.state.currId}
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Type Tag Title"
                    icon="fas fa-hashtag"
                    value={this.state.title}
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBDropdown>
                    <MDBDropdownToggle caret color="primary">
                      Status
                    </MDBDropdownToggle>
                    <MDBDropdownMenu basic color="info">
                      <MDBDropdownItem active={this.state.status === "Active"}>
                        Active
                      </MDBDropdownItem>
                      <MDBDropdownItem
                        active={this.state.status === "Deactive"}
                      >
                        Deactive
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </form>
              </MDBModalBody>
              <MDBModalFooter className="justify-content-center">
                <MDBBtn onClick={e => this.handleSubmitUpdate(e)}>
                  Submit
                </MDBBtn>

                <MDBBtn onClick={e => this.handleCancel(e)}>Cancel</MDBBtn>
              </MDBModalFooter>
            </MDBModal>

            <MDBRow className="py-9">
              <MDBCol md="12">
                <MDBDataTable
                  striped
                  bordered
                  small
                  paging={true}
                  displayEntries={true}
                  data={datamax}
                />
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBContainer>
      </AdminLayout>
    );
  }
}

export default TagManagementPage;
