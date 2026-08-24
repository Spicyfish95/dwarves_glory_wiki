import { Flex } from 'antd'

import WikiContent from './Component/WikiContent';

function App() {
  return (
    <Flex className='wiki_layout' vertical>
      <section className='wiki_header'>矮人军团自走棋物品图鉴</section>
      <WikiContent />
    </Flex>
  )
}

export default App
