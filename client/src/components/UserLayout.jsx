import UserSideBar from "./UserSideBar";
import Section from "./Section";
import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";
import ClientLayout from "./ClientLayout";

function UserLayout() {
  return (
    <ClientLayout>
      <Section>
        <Row gutter={32} align={"center"}>
          <Col span={6}>
            <UserSideBar />
          </Col>
          <Col span={14}>
            <Outlet />
          </Col>
        </Row>
      </Section>
    </ClientLayout>
  );
}

export default UserLayout;
