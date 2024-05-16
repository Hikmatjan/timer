import React from "react";
import { Form, Input, Upload, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const App = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <div className="flex items-center flex-col  mt-3">
      <Form onFinish={onSubmit}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>

        <Form.Item
          label="Upload"
          name="main_image"
          rules={[{ required: true, message: "Please add image!" }]}
        >
          <Upload
            name="image"
            action="https://res.cloudinary.com/dj28bsagl/image/upload/v1715606089/gp1bqrf7n7kpevntznqm.jpg"
          >
            <button
              style={{
                border: 0,
                background: "none",
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
