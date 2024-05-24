import { LoadingOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";

const LoadingScreen = () => {
  return (
    <Content
      style={{
        justifyContent: "center",
        alignItems: "center",
        margin: "0 1rem 0.5rem 0",
      }}
    >
      <LoadingOutlined />
    </Content>
  );
};

export default LoadingScreen;
