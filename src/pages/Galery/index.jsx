import { Col, Row, Typography, Card, List,  Form, FloatButton, notification, Drawer, Input, Skeleton, Button, Popconfirm } from "antd";
//import { useLocation } from "react-router-dom";
import { getData, sendData, deleteData } from "../../utils/api";
import { useEffect, useState} from "react";
import {PlusCircleOutlined, EditOutlined, DeleteOutlined, SearchOutlined} from '@ant-design/icons';
import {ellipsisGenerator} from "../../utils/ui";


const dataDummy = [
  {key: 1, title: "Jhon", description: "The boy with blue hat"}, 
  {key: 2, title: "Jean", description: "The girl with red hat"}, 
  {key: 3, title: "Foo", description: "The mysterious person in the class"}, 
  {key: 4, title: "Romeo", description: "The boy with golden hairs"}, 
  {key: 5, title: "Juliet", description: "The girl with golden hairs"}, 
];


const { Title, Text } = Typography;
  const Galery = () => {
    const [form] = Form.useForm();
    const [dataSource, setDataSource]=useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isDrawer, setIsDrawer] = useState(false)
    const [api, contextHolder] = notification.useNotification();
    const [searchTextList, setSearchTextList] = useState("");
    const [searchText, setSearchText] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [idSelected, setIdSelected] = useState(null);
    const [dataList, setDataList] = useState([]);
    
    const getDataDummy = () => {
      setDataList(dataDummy)
    };

    const showAlert = (status, title, description) => {
      api[status]({
        message: title,
        description: description,
      });
    };

    const handleDrawer = () => {
      setIsDrawer(true);
      };

    const onCloseDrawer = () => {
      if (isEdit) {
        form.resetFields();
        setIsEdit(false);
        setIdSelected(null)
      }
      setIsDrawer(false);
      };

    const confirmDelete = (record_id) => {
      let url = `/api/natures/${record_id}`;
      let params = new URLSearchParams();
      params.append("id", record_id);
      deleteData(url, params)
        .then((resp) => {
            if (resp?.status == 200) {
              showAlert("success", "Data deleted", "Data berhasil terhapus");
              getDataGaleri();
              form.resetFields();
              onCloseDrawer();
            } else {
              showAlert("error", "Failed", "Data gagal terhapus");
            }
        })
        .catch((err) => {
          console.log(err);
          showAlert("error", "Failed", "Data gagal terhapus")
        });

    };


    const handleSubmit = () => {
      let nameNatures = form.getFieldValue("name_natures");
      let description = form.getFieldValue("description");

     
      //mengirim data
      let formData = new FormData ()
      formData.append("name_natures", nameNatures)
      formData.append("description", description)

      let url = isEdit ? "/api/natures/"+idSelected : "/api/natures"
      let request = sendData(url, formData)

      request
        .then((resp) =>{
          if (resp) {
            showAlert(
              "success",
              "Data Terkirim",
              "Sukses Mengirim Data, Data Tersimpan"
            );
            form.resetFields();
            getDataGaleri();
            onCloseDrawer();
          } else {
            showAlert("error", "Pengiriman gagal", "Data tidak dapat dikirim");
          }
        })
        .catch ((err) => {
          console.log(err);
          showAlert("error", "pengiriman gagal", "data tidak bisa dikirim");
        } )
    };

    const handleSearchList = (value) => {
      setSearchTextList (value);
    };

    const handleSearch = (value) => {
      setSearchText (value);
    };

    const handleDrawerEdit = (record) => {
      setIsDrawer(true);
      setIsEdit(true);
      setIdSelected(record?.id);
      form.setFieldValue("name_natures", record?.name_natures);
      form.setFieldValue("description", record?.description);
    };

    const renderDrawer = () => {
      return (
        <Drawer 
        title={isEdit ? "Edit Form" : "Add Data"}
        onClose={onCloseDrawer} 
        open={isDrawer}
        extra={ <>
          <Button 
          htmlType="submit"
          type="primary "
          onClick={() => handleSubmit()}
          style={{ backgroundColor: isEdit ? "green" : "blue", color: 'white'}}
          >
              Submit
          </Button>
        </>
        }
        >
        <Form form={form} layout="vertical">
            <Form.Item name="name_natures" label={"Name of natures"} required>
                <Input />
            </Form.Item>
            <Form.Item name="description" label={"Description"} required>
                <Input.TextArea rows={3}/>
            </Form.Item>
        </Form>

          </Drawer>
      );
    };


    useEffect(()=>{
        getDataGaleri();
        getDataDummy();
    },[])

    const getDataGaleri=()=>{
        setIsLoading(true)
        getData("/api/natures").then(resp => {
            setIsLoading(false)
            if(resp){
                setDataSource(resp)
            }
        }).catch(err => {
            setIsLoading(false)
            console.log(err)
        })
    }

    let dataListFilters = dataList?.filter((item) => {
      return (
        item?.title.toLowerCase().includes(searchTextList) || 
        item?.description.toLowerCase().includes(searchTextList)
      );
    });

    let dataSourceFiltered = dataSource.filter((item) => {
      return (
          (item?.name_natures?.toLocaleLowerCase() || " ").includes(searchText) ||
          (item?.description?.toLocaleLowerCase() || " ").includes(searchText)
      );
  });

    return (
      <div className="layout-content">
        {contextHolder}
        <Row gutter={[24, 0]}>
          <Col xs={22} className="mb-24">
          <Input
            prefix={ <SearchOutlined/>}
            placeholder="Search here"
            allowClear size="large"
            onChange={(e) => handleSearchList(e.target.value)}
            />

            <List
              header={<div>Header</div>}
              footer={<div>Footer</div>}
              bordered
              dataSource={dataListFilters}
              renderItem={(item) => (
                <List.Item>
                  <Typography.Text mark>[{item?.title}]</Typography.Text> {" "}
                  {item?.description}
                </List.Item>
              )}
            />
            
          <Title>Nature Gallery</Title>

          <FloatButton
            type="primary"
            tooltip={<div>Add Gallery</div>}
            icon={<PlusCircleOutlined/>}
            onClick={() => handleDrawer()}
            />

          {renderDrawer()}

          <Input
            placeholder="Search here .... "
            prefix={<SearchOutlined />}
            className="header-search"
            allowClear size={"large"}
            onChange={(e) => handleSearch(e.target.value)}
          />

          {dataSource.length > 0 && !isLoading ?  <List
            grid={{
              gutter: 20,
              xs:1,
              lg : 3,
              md: 3,
              sm:2,
              xl:4,
            }}

            dataSource={dataSourceFiltered ?? []}
            renderItem={(item) => (
                <List.Item>
                <Card
                    hoverable
                    style={{
                    width: 240,
                    }}
                    cover={<img alt="example" src={item?.url_photo} />}
                    actions={[
                      <EditOutlined key={item?.id} onClick={()=> handleDrawerEdit(item)}/>,
                      <Popconfirm
                      key={ item?.id}
                      title="Delete the task"
                      description={`Are you sure to delete "${item?.name_natures}"?`}
                      onConfirm={() => confirmDelete(item?.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined key={item?.id}/>,
                    </Popconfirm>
                      
                    ]}
                >
                    <Card.Meta 
                      title={item?.name_natures} 
                      description={
                      <Text ellipsis={ellipsisGenerator(item?.description)}>
                        {item?.description}
                      </Text> 
                    }
                     />
                </Card>
            </List.Item>
            )}/> : isLoading ? <Skeleton active/> : "No Data"}
         
        </Col>
      </Row>
    </div>
  );
};

export default Galery;