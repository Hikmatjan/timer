import React from "react";
import "./index.css";
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Modal,
  Form,
  Input,
  Upload,
  InputNumber,
  Skeleton,
  Mentions,
  Carousel,
} from "antd";

const { Meta } = Card;

const Example = () => {
  const [seeFlower, setSeeFlower] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [flowers, setFlowers] = useState();
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (values) => {
    // console.log("Received  values from from", values);
    // console.log(values);
    const detailed_images = [
      values.image1.file.response.image_url.url,
      values.image2.file.response.image_url.url,
      values.image3.file.response.image_url.url,
      values.image4.file.response.image_url.url,
    ];
    console.log(values);
    const shouldUploaded = {
      title: values.title,
      price: values.price,
      main_image: values.upload.file.response.image_url.url,
      discount: values.discount,
      detailed_images: detailed_images,
      rate: 0,
      views: 0,
      tags: [],
      comments: values.comments,
      description: values.description,
      short_description: values.short_description,
    };
    await fetch(
      "http://localhost:8080/api/flower/category/potter-plants?access_token=64bebc1e2c6d3f056a8c85b7",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0YzAyZDEwMzIwNjk5ODJkYmJhOTRlZiIsIm5hbWUiOiJUZXN0Iiwic3VybmFtZSI6IlRlc3RvdiIsInBhc3N3b3JkIjoidGVzdF90ZXN0IiwicGVybWlzc2lvbiI6eyJjcmVhdGUiOmZhbHNlLCJ1cGRhdGUiOmZhbHNlLCJkZWxldGUiOmZhbHNlLCJyZWFkIjp0cnVlfSwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInVzZXJfdHlwZSI6Im9ic2VydmVyIiwiY3JlYXRlX3Bvc3RfbGltaXQiOjAsImNyZWF0ZV9hY2NvdW50X2xpbWl0IjowLCJjcmVhdGVfcGxhbnRfbGltaXQiOjAsImhhc2h0YWdzIjpbXSwid2lzaGxpc3QiOltdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNy0yNVQyMDoxNDowOC4wNDhaIiwiX192IjowfSwiaWF0IjoxNjkwMzE2MjY3fQ.Lwf1q47UoD5eUzFp4IXjgCD05xvnDrojZ5lST9mrMfc",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shouldUploaded),
      }
    ),
      setFlowers([...flowers, shouldUploaded]);
    setOpen(false);
  };
  const removeImage = async (imageId) => {
    console.log(imageId);
    await fetch(
      `http://localhost:8080/api/user/product/potter-plants?access_token=64bebc1e2c6d3f056a8c85b7`,
      {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0YzAyZDEwMzIwNjk5ODJkYmJhOTRlZiIsIm5hbWUiOiJUZXN0Iiwic3VybmFtZSI6IlRlc3RvdiIsInBhc3N3b3JkIjoidGVzdF90ZXN0IiwicGVybWlzc2lvbiI6eyJjcmVhdGUiOmZhbHNlLCJ1cGRhdGUiOmZhbHNlLCJkZWxldGUiOmZhbHNlLCJyZWFkIjp0cnVlfSwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInVzZXJfdHlwZSI6Im9ic2VydmVyIiwiY3JlYXRlX3Bvc3RfbGltaXQiOjAsImNyZWF0ZV9hY2NvdW50X2xpbWl0IjowLCJjcmVhdGVfcGxhbnRfbGltaXQiOjAsImhhc2h0YWdzIjpbXSwid2lzaGxpc3QiOltdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNy0yNVQyMDoxNDowOC4wNDhaIiwiX192IjowfSwiaWF0IjoxNjkwMzE2MjY3fQ.Lwf1q47UoD5eUzFp4IXjgCD05xvnDrojZ5lST9mrMfc",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: "64ec3b19cc4023482b6ef94b",
        }),
      }
    );
    setFlowers(flowers.filter((flower) => flower._id !== imageId));
  };

  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch(
        "http://localhost:8080/api/flower/category/potter-plants?access_token=64bebc1e2c6d3f056a8c85b7"
      );
      const data = await response.json();

      setTimeout(() => {
        setFlowers(data.data);
        setLoading(false);
      }, 1000);

      console.log(data);
    };
    fetchdata();
  }, []);
  const flowerDetails = (flowers) => {
    setSeeFlower(flowers);
    setIsModalOpen(true);
  };
  return (
    <div className="flex items-center flex-col ">
      <Modal
        okText="Create"
        onOk={() => setOpen(false)}
        open={open}
        onCancel={() => setOpen(false)}
        title="Add Flowers"
        footer={false}
      >
        <Form onFinish={onFinish}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input your title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Main image"
            name="upload"
            rules={[{ required: true, message: "Please add your image" }]}
          >
            <Upload
              action={
                "http://localhost:8080/api/upload?access_token=64bebc1e2c6d3f056a8c85b7"
              }
              name="image"
            >
              <Button>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Image1"
            name="image1"
            rules={[{ required: true, message: "Please add your image" }]}
          >
            <Upload
              action={
                "http://localhost:8080/api/upload?access_token=64bebc1e2c6d3f056a8c85b7"
              }
              name="image"
            >
              <Button>Add</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Image2"
            name="image2"
            rules={[{ required: true, message: "Please add your image" }]}
          >
            <Upload
              action={
                "http://localhost:8080/api/upload?access_token=64bebc1e2c6d3f056a8c85b7"
              }
              name="image"
            >
              <Button>Add</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Image3"
            name="image3"
            rules={[{ required: true, message: "Please add your image" }]}
          >
            <Upload
              action={
                "http://localhost:8080/api/upload?access_token=64bebc1e2c6d3f056a8c85b7"
              }
              name="image"
            >
              <Button>Add</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Image4"
            name="image4"
            rules={[{ required: true, message: "Please add your image" }]}
          >
            <Upload
              action={
                "http://localhost:8080/api/upload?access_token=64bebc1e2c6d3f056a8c85b7"
              }
              name="image"
            >
              <Button>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please add your price" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Discount_Price"
            name="discount_price"
            rules={[
              {
                required: true,
                message: "Please add your  discount_price",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please add description",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Short_description"
            name="short_description"
            rules={[
              {
                required: true,
                message: "Please add short description",
              },
            ]}
          >
            <Mentions />
          </Form.Item>
          <Form.Item
            label="Comments"
            name="comments"
            rules={[
              {
                required: true,
                message: "Please add comments",
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button danger onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button htmlType="submit">Create</Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={isModalOpen}
        title="Flower Details"
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>,
        ]}
      >
        {seeFlower && (
          <>
            <h4>Title: {seeFlower.title}</h4>
            <p>Description: {seeFlower.description}</p>
            <p>Discount Price: {seeFlower.discount_price}</p>
            <p>Price: {seeFlower.price}</p>
            <p>Discount: {seeFlower.discount}</p>
            <p>Short Description: {seeFlower.short_description}</p>
            <Carousel>
              {seeFlower.detailed_images.map((img, index) => (
                <div key={index}>
                  <img
                    src={img}
                    // alt={`detail ${index}`}
                    style={{ width: "100%" }}
                  />
                </div>
              ))}
            </Carousel>
          </>
        )}
      </Modal>

      <div className="absolute top-0 right-2 ">
        <Button onClick={() => setOpen(true)}>Add</Button>
      </div>
      <div className="items-center justify-between gap-4">
        {loading ? (
          <>
            <Skeleton active paragraph={{ rows: 4 }} />
            <Skeleton active paragraph={{ rows: 1 }} />
            <Skeleton active paragraph={{ rows: 1 }} />
          </>
        ) : (
          flowers.map(
            ({
              _id,
              main_image,
              title,
              short_description,
              discount,
              discount_price,
              detailed_images,
              description,
              price,
            }) => {
              return (
                <Card
                  key={_id}
                  style={{
                    width: 240,
                  }}
                  cover={
                    <Carousel autoplay>
                      {detailed_images.map((main_image, index) => (
                        <div key={index}>
                          <img alt={`flower-${index}`} src={main_image} />
                        </div>
                      ))}
                    </Carousel>
                  }
                  actions={[
                    <SettingOutlined
                      key="setting"
                      onClick={() =>
                        flowerDetails({
                          _id,
                          main_image,
                          title,
                          short_description,
                          description,
                          price,
                          discount,
                          discount_price,
                          detailed_images,
                        })
                      }
                    />,
                    <EditOutlined key="edit" />,
                    <DeleteOutlined
                      key="delete"
                      onClick={() => removeImage(_id)}
                    />,
                  ]}
                >
                  <Meta title={title} description={short_description} />
                </Card>
              );
            }
          )
        )}
      </div>
    </div>
  );
};

export default Example;
