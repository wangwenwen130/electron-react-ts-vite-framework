import { Layout } from 'antd'
const { Header, Content, Sider } = Layout
import HeaderCom from './header'
import Sidebar from './sidebar'
import ContentCom from './content'

export default function Wrapper() {
  return (
    <Layout className="wh-full">
      <Sider width="25%" className="bg-white">
        <Sidebar />
      </Sider>
      <Layout>
        <Header className="h-64 bg-white">
          <HeaderCom />
        </Header>
        <Content className="bg-white">
          <ContentCom />
        </Content>
      </Layout>
    </Layout>
  )
}
