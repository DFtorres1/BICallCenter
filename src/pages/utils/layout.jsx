import { Card, Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { BiSolidOffer } from "react-icons/bi";
import { FaExchangeAlt } from "react-icons/fa";
import { IoHomeSharp, IoPeople } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    label: "Home",
    key: "1",
    icon: <IoHomeSharp />,
    child: "/",
  },
  {
    label: "Llamadas",
    key: "2",
    icon: <BiSolidOffer />,
    child: "/calls",
  },
  {
    label: "Volumen de ventas",
    key: "3",
    icon: <FaExchangeAlt />,
    child: "/sales",
  },
  {
    label: "Satisfacción",
    key: "4",
    icon: <IoPeople />,
    child: "/satisfaction",
  },
];

// eslint-disable-next-line react/prop-types
const PageLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPath, setCurrentPath] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (currentPath) {
      navigate(`${currentPath}`);
    }
  }, [currentPath, navigate]);

  const handleCurrentPath = (value) => {
    const item = items.find((item) => item.key == value);
    setCurrentPath(item?.child);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          paddingLeft: "40",
          background: "#125BD1",
          color: "aliceblue",
          fontSize: "30px",
          height: "10vh",
        }}
      >
        <h1 style={{padding: "0", margin: "0"}}>BI Call Center</h1>
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{ background: "#000000" }}
        >
          <Menu
            style={{ fontSize: "16px", background: "#000000" }}
            theme="dark"
            mode="inline"
            items={items}
            onSelect={(value) => handleCurrentPath(value.key)}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              paddingLeft: "40",
              background: "#213547",
              color: "aliceblue",
              fontSize: "30px",
            }}
          >
            BI CallCenter
          </Header>
          <Content style={{ minHeight: "70vh" }}>
            <div style={{ padding: "25px", minHeight: "70vh" }}>
              <Card>{children}</Card>
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
              padding: "0",
              background: "#125BD1",
              color: "aliceblue",
              justifyContent: "center",
              paddingTop: "2vh",
              height: "6.5vh",
            }}
          >
            BI CallCenter
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
