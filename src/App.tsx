import { Layout } from 'antd'

import WikiContent from './Component/WikiContent';

const { Header } = Layout;
const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#2e2e2e',
  fontSize:24,
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: "#fff"
};

function App() {
  return (
    <Layout>
      <Header style={headerStyle}>矮人军团自走棋物品图鉴</Header>
      <WikiContent />
    </Layout>
  )
}

export default App
