import { Layout } from 'antd'
const { Content, Sider } = Layout
import Sidebar from './sidebar'
import ContentCom from './content'
import Business from './business'

export default function Wrapper() {
  return (
    <Business>
      <Layout className="wh-full">
        <Sider width="248" className="bg-white">
          <Sidebar />
        </Sider>
        <Content className="bg-white">
          <ContentCom />
        </Content>
      </Layout>
    </Business>
  )
}
