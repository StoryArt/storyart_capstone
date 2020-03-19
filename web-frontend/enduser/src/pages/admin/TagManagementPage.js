import React from "react";
import MainLayout from "../../layouts/main-layout/MainLayout";
import TagService from "../../services/tag.service";
import axios from "axios";
import DateTimeUtils from '../../utils/datetime';

import {
  MDBDataTable, MDBNotification, MDBContainer, MDBRow,MDBCol,
  MDBModal, MDBBtn, MDBModalHeader, MDBModalFooter, MDBModalBody,
  MDBDropdownItem, MDBInput, MDBDropdownToggle, MDBDropdown, MDBDropdownMenu,
  MDBBadge, MDBCard
} from "mdbreact";

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
    isactive: false,
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
  loadData = () => {
    const url = "http://localhost:8003/tags/getAll";
    axios.get(url).then(res => {
      this.setState({ data: res.data.content });
      this.setState({ loading: true });
    });
  };

  componentDidMount() {
    this.loadData();
  }

  handleSubmit = e => {
    let tag = { title: this.state.title };
    
    const url = "http://localhost:8003/tags";
    axios.post(url, tag)
    .then(res => {
      this.setState({ visible: false });
      this.setState({ status: "", currId: "", title: "" });
      this.loadData();
    }).catch(error => {
      console.log(error);
    })
    
  };

  handleSubmitUpdate = e => {
    let id = this.state.currId;
    let titles = this.state.title;
    let ac = this.state.isactive;
    let isUpdate = false;
    if (ac === null) {
      isUpdate = true;
    }
    let status = false;
    if (ac === true) {
      status = true;
    } else if (ac === false) {
      status = false;
    }
    let tag = {
      id: id,
      title: titles,
      active: status,
      isUpdate: isUpdate
    };
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const url = "http://localhost:8003/tags";
    axios.put(url, tag, config).then(res => {
      this.setState({ visible3: false });
      this.setState({ status: "", currId: "", title: "" });
      this.loadData();
    });
  };

  renderTab(arr) {
    return arr.map(({ id, title, createdAt, updatedAt, active }) => {
      let check = "";
      if (active === "Enable") {
        check = "primary";
      } else if (active === "Deactive") {
        check = "danger";
      }
      return {
        rows: [
          {
            title: <MDBBadge color="default">{title}</MDBBadge>,
            updatedAt: (
              <div>{ DateTimeUtils.getDateTime(updatedAt) }</div>
            ),
            active: <MDBBadge color="primary">{active}</MDBBadge>,
            status: (
              <MDBBtn
                onClick={e => this.handleIdtoChange(id, title)}
                color="purple"
                size="sm"
              >
                Cập Nhật
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
        dat.active = "Kích Hoạt";
      } else if (dat.active === false) {
        dat.active = "Không Kích Hoạt";
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
          label: "Tên Nhãn",
          field: "title",
          width: "30%",
          sort: "asc"
        },
        {
          label: "Ngày Cập Nhật",
          field: "updatedAt",
          width: "10%",
          sort: "asc"
        },

        {
          label: "Tình Trạng",
          field: "active",
          width: "10%",
          sort: "asc"
        },
        {
          label: "Hành Động",
          field: "status",
          width: "10%"
        }
      ],
      rows: []
    };

    for (let i = 0; i < data.length; i++) {
      datamax.rows.push(this.renderTab(data)[i].rows[0]);
    }

    return (
      <MainLayout>
        <MDBContainer>
          <MDBCard>
            <MDBRow type="flex" justify="start">
              <MDBCol span={21}>
                <h1>Nhãn</h1>
                <h3>Quản Lí Nhãn</h3>
              </MDBCol>
            </MDBRow>
            <br />
            <br />
            <hr className="my-5" />
            <div>
              <MDBBtn
                className="mr-md-n8 ml-5"
                rounded
                onClick={e => this.showModal(e)}
              >
                Thêm Nhãn
              </MDBBtn>
            </div>

            <MDBModal isOpen={visible}>
              <MDBModalHeader
                className="text-center"
                titleClass="w-100 font-weight-bold"
                toggle={e => this.showModal(e)}
              >
                Thêm Nhãn
              </MDBModalHeader>
              <MDBModalBody>
                <form className="mx-3 grey-text">
                  <MDBInput
                    label="Nhập vào tên nhãn"
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
                <MDBBtn onClick={e => this.handleSubmit(e)}>Thêm Nhãn</MDBBtn>

                <MDBBtn onClick={e => this.handleCancel(e)}>Thoát</MDBBtn>
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
                    label="Nhập tên nhãn"
                    icon="fas fa-hashtag"
                    value={this.state.title}
                    onChange={e => this.handleChange(e)}
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBDropdown>
                    <MDBDropdownToggle caret color="primary">
                      Tình Trạng
                    </MDBDropdownToggle>
                    <MDBDropdownMenu basic color="info">
                      <MDBDropdownItem onClick={e => this.setState({ isactive: true })}>
                        kích hoạt
                      </MDBDropdownItem>
                      <MDBDropdownItem
                        onClick={e => this.setState({ isactive: false })}
                      >
                        không kích hoạt
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </form>
              </MDBModalBody>
              <MDBModalFooter className="justify-content-center">
                <MDBBtn onClick={e => this.handleSubmitUpdate(e)}>
                  Cập Nhật
                </MDBBtn>

                <MDBBtn onClick={e => this.handleCancel(e)}>Thoát</MDBBtn>
              </MDBModalFooter>
            </MDBModal>

            <div>
              <MDBRow className="py-9">
                <MDBCol md="12" className="pl-5 pr-5">
                  <MDBDataTable
                    className="pl-0 pr-0"
                    striped
                    bordered
                    small
                    paging={true}
                    displayEntries={true}
                    data={datamax}
                  />
                </MDBCol>
              </MDBRow>
            </div>
          </MDBCard>
        </MDBContainer>
      </MainLayout>
    );
  }
}

export default TagManagementPage;
