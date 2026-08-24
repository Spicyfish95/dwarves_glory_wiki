import {  useState  } from "react";
import "./WikiContent.css";
import { Affix, Button, Flex, Form, Layout, Tag, Input } from 'antd';
import WikiList from "./WikiList";
import { biomeTags, itemTypeTags, professionTags, statsTags } from "../assets/datas/TabDatas";
import type { FilterType } from "../assets/datas/Types";

const { Content } = Layout;

let Timer: number | undefined = undefined;

function WikiContent() {
  const [form] = Form.useForm();
  const [filterData, setFilterData] = useState<FilterType | null>(null);


    const onValuesChange = (changed: Partial<FilterType>, formData: FilterType) =>{
        if(Timer){
            clearTimeout(Timer);
        }
        Timer = setTimeout(() => {
            setFilterData(formData);
            clearTimeout(Timer);
        }, 300);
    }

    const clearFilter = () => {
        form.resetFields();
        setFilterData(null); 
    }

    return (
            <Flex className='wiki_content' vertical>
                <Affix offsetTop={0}>
                    <Flex vertical gap={10} className="wiki_content_header">
                        <Form className="wiki_tag" form={form} size="small" onValuesChange={onValuesChange}>
                            <Form.Item className="wiki_search_wrap" style={{width: "100%", flexShrink: 1}}>
                                <Form.Item className="wiki_search" htmlFor="keyword" name="keyword">
                                    <Input id="keyword" placeholder="输入物品名称进行搜索" allowClear></Input>
                                </Form.Item>
                                 <Form.Item className="wiki_button">
                                    <Button size="middle" onClick={clearFilter}>重置筛选项</Button>
                                 </Form.Item>
                            </Form.Item>
                            <Form.Item className="wiki_tag_item" htmlFor="itemType" label="物品类型" name="itemType">
                                <Tag.CheckableTagGroup id="itemType" options={itemTypeTags} />
                            </Form.Item>
                            <Form.Item className="wiki_tag_item" htmlFor="biomeType" label="物品来源" name="biomeType">
                                <Tag.CheckableTagGroup id="biomeType" options={biomeTags} />
                            </Form.Item>
                            <Form.Item className="wiki_tag_item" htmlFor="characterStat" label="主要属性" name="characterStat">
                                <Tag.CheckableTagGroup id="characterStat" options={statsTags} />
                            </Form.Item>
                            <Form.Item className="wiki_tag_item" htmlFor="professionType" label="主要职业" name="professionType">
                                <Tag.CheckableTagGroup id="professionType" options={professionTags} />
                            </Form.Item>
                        </Form>
                    </Flex>
                </Affix>
                <WikiList className="wiki_list" filterData={filterData} ></WikiList>
            </Flex>
    )
}

export default WikiContent;