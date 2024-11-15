import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
} from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined } from "@ant-design/icons";
import SignBG from "../../assets/images/WADOL.png";
import Google from "../../assets/images/google.png";
import Instagram from "../../assets/images/instagram.jpg";
import Tweeter from "../../assets/images/tweeter.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./signup.css"; // Importing the CSS file

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSignup = async () => {
    console.log(username, password);
    navigate("/login", { replace: true });
  };

  return (
    <Layout className="layout-default layout-signin">
      <Header className="header-fix" style={{position: 'fixed'}}>
        <div className="header-col header-brand">
          <img src={SignBG} alt="Wadol Logo" />
          <h5>Watching Dolphins</h5>
        </div>
      </Header>
      <Content className="signin login-container">
        <Row gutter={[10, 0]} justify="center">
          <Col xs={{ span: 24 }} className="col-center">
            <img src={SignBG} alt="" className="sign-img" />
          </Col>

          <Col xs={{ span: 24 }} lg={{ span: 8 }} md={{ span: 12 }}>
            <Title className="mb-15 text-center">Sign Up</Title>
            <Title className="font-regular text-muted text-center" level={5}>
              Create a free account
            </Title>
            <Form
              onFinish={() => handleSignup()}
              layout="vertical"
              className="row-col"
            >
              <Form.Item
                className="name"
                initialValue={name}
                label="Name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input placeholder="Name" prefix={name ? null : <UserOutlined />} />
              </Form.Item>

              <Form.Item
                className="phone"
                initialValue={phone}
                label="Phone"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                rules={[{ required: true, message: "Please input your phone!" }]}
              >
                <Input placeholder="Phone" prefix={phone ? null : <PhoneOutlined />} />
              </Form.Item>

              <Form.Item
                className="username"
                initialValue={username}
                label="Email"
                name="email"
                onChange={(e) => setUsername(e.target.value)}
                rules={[{ required: true, message: "Please input your email!" }]}
              >
                <Input placeholder="Email" prefix={username ? null : <MailOutlined />} />
              </Form.Item>

              <Form.Item
                className="password"
                initialValue={password}
                label="Password"
                name="password"
                type={"password"}
                onChange={(e) => setPassword(e.target.value)}
                rules={[{ required: true, message: "Please input your password!" }]}
              >
                <Input.Password placeholder="Password" prefix={password ? null : <LockOutlined />} />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="full-width-btn"
                  disabled={username === "" || password === "" || name === "" || phone === ""}
                >
                  SIGN UP
                </Button>
              </Form.Item>

              <div className="centered-text">
                <Typography.Text type="secondary">OR</Typography.Text>
              </div>

              <div className="social-icons">
                <img src={Google} alt="Google" className="social-icon" />
                <img src={Instagram} alt="Instagram" className="social-icon" />
                <img src={Tweeter} alt="Tweeter" className="social-icon" />
              </div>

              <div className="margin-top-10 text-center">
                <Typography.Text type="secondary">Already have an account?</Typography.Text>
                <Button type="link" onClick={() => navigate("/login")}>
                  SIGN IN
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Content>
      <Footer>
        <p className="copyright">
          Copyright © 2024 Joy Team - Powered by Universitas Pendidikan Ganesha
        </p>
      </Footer>
    </Layout>
  );
};

export default SignupPage;
