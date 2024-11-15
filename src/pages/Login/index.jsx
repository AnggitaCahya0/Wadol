import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
} from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import SignBG from "../../assets/images/WADOL.png";
import Google from "../../assets/images/google.png";
import Instagram from "../../assets/images/instagram.jpg";
import Tweeter from "../../assets/images/tweeter.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./login.css"; // Importing the CSS file

const { Title } = Typography;
const { Header, Footer, Content } = Layout;
const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    console.log(username, password);
    navigate("/dashboard", { replace: true });
  };

  return (
    <Layout className="layout-default layout-signin">
      <Header className="header-fix" style={{position:'fixed'}}>
        <div className="header-col header-brand">
          <img src={SignBG} alt="Wadol Logo" />
          <h5>Watching Dolphins</h5>
        </div>
      </Header>
      <Content className="signin login-container">
        <Row gutter={[10, 0]} justify="center">
          <Col xs={{ span: 24 }} className="text-center">
            <img src={SignBG} alt="" className="sign-img" />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 8 }} md={{ span: 12 }}>
            <Title className="text-muted text-center" level={5}>
              Welcome Back to Watching Dolphins
            </Title>
            <Form onFinish={handleLogin} layout="vertical">
              <Form.Item
                className="username"
                initialValue={username}
                label="Email"
                name="email"
                onChange={(e) => setUsername(e.target.value)}
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input placeholder="Email" prefix={username ? null : <MailOutlined />}/>
              </Form.Item>
              <Form.Item
                className="password"
                initialValue={password}
                label="Password"
                name="password"
                type={"password"}
                onChange={(e) => setPassword(e.target.value)}
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password placeholder="Password" prefix={password ? null : <LockOutlined />} />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="full-width-btn"
                  disabled={username === "" || password === ""}
                >
                  SIGN IN
                </Button>
              </Form.Item>
              <div className="margin-top-10 text-center">
                <Typography.Text type="secondary">OR</Typography.Text>
              </div>
              <div className="margin-top-10 text-center">
                <img src={Google} alt="Option 1" className="icon-round" />
                <img src={Instagram} alt="Option 2" className="icon-round" />
                <img src={Tweeter} alt="Option 3" className="icon-round" />
              </div>
              <div className="margin-top-10 text-center">
                <Typography.Text type="secondary">Need an account?</Typography.Text>
                <Button type="link" onClick={() => navigate("/signup")}>
                  SIGN UP
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Content>
      <Footer className="footer">
        <p> Copyright © 2024 Joy Team - Powered by Universitas Pendidikan Ganesha</p>
      </Footer>
    </Layout>
  );
};
export default LoginPage;
