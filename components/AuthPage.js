import { Button, Form, Input } from "antd";

const AuthPage = () => {
  const onFinish = (values) => {
    const { username, password } = values;
    if (username === "admin" && password === "admin") {
      window.localStorage.setItem("is_authenticated", "true");
      window.location.reload();
    } else {
      alert("Wrong email or password");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        margin: "0 auto",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        height: "100vh",
      }}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialvalues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
      <h1 style={{
        display: "block",
        textAlign: "center",
        fontSize: "2rem",
      }}>
        DinoLand Admin
      </h1>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
          placeholder="admin"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          placeholder="admin"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AuthPage;
