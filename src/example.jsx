import React from "react";
import { useEffect, useState } from "react";
import { Button, Card, Modal, Form, Input, Upload, InputNumber } from "antd";

const { Meta } = Card;

const Example = () => {
  const onFinish = async (values) => {
    console.log(values);

    const shouldUploaded = {
      title: values.title,
      price: values.price,
      main_image: values.main_image.file.response.image_url,
      discount: false,
      detailed_images: [
        "https://www.coartsinnovation.com/wp-content/uploads/2021/05/Artificial-Topiary-CAJM-7136.png",
        "https://www.coartsinnovation.com/wp-content/uploads/2021/05/Artificial-Topiary-CAJM-7136.png",
        "https://cdn11.bigcommerce.com/s-2mpfm/images/stencil/640w/products/169512/743847/5965__41958.1630728740.jpg?c=2",
        "https://cdn11.bigcommerce.com/s-2mpfm/images/stencil/640w/products/169089/743279/5493__27309.1630683935.jpg?c=2",
      ],
      rate: 0,
      views: 0,
      tags: [],
      comments: [],
      description: "Description",
      short_description: "short",
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
      setOpen(false);
  };
  const [open, setOpen] = useState(false);
  const [flowers, setFlowers] = useState();
  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch(
        "http://localhost:8080/api/flower/category/potter-plants?access_token=64bebc1e2c6d3f056a8c85b7"
      );
      const data = await response.json();
      setFlowers(data.data);
      console.log(data);
    };
    fetchdata();
  }, []);
  return (
    <div className="flex items-center justify-center flex-col ">
      <Modal
        okText="Create"
        onOk={() => setOpen(false)}
        open={open}
        onCancel={() => setOpen(false)}
        title="Add Flower"
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
            label="Upload"
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
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please add your price" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item>
            <Button danger onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button htmlType="submit">Create</Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="absolute top-0 right-2">
        <Button onClick={() => setOpen(true)}>Add</Button>
      </div>

      <div className=" flex items-center flex-col gap-6">
        {flowers?.map(({ _id, main_image, title, short_description }) => {
          return (
            <Card
              key={_id}
              style={{
                width: 240,
              }}
              cover={<img alt="example" src={main_image} />}
            >
              <Meta title={title} description={short_description} />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Example;
