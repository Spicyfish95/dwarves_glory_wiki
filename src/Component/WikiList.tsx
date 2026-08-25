import "./WikiList.css"
import { Empty, Flex } from "antd";
import { useMemo } from "react";
import WikiItem from "./WikiItem";
import type { FilterType, ItemModuleType } from "../assets/datas/Types";
import { itemDatas } from "../assets/datas/ItemDatas";

interface IProps {
    filterData: FilterType | null
}

function filterList(filterData: FilterType | null): ItemModuleType[]{
    // debugger
    if(filterData === null) return itemDatas;
    // 搜索物品
    if(filterData.keyword !== undefined && filterData.keyword.trim() !== "") {
        return itemDatas.filter(item => item.name.includes(filterData.keyword as string));
    }
    // 标签筛选
    const exactKeys = Object.keys(filterData).filter(key => key !=="keyword" && filterData[key as keyof FilterType] != undefined);
    if(!exactKeys.length) return itemDatas;
    return itemDatas.filter((item: ItemModuleType) => {
        return exactKeys.every((key) => {
            const curData = item[(key as keyof ItemModuleType)];
            const tagData = filterData[(key as keyof FilterType)];
            if(!Array.isArray(curData)) return false;
            return curData.includes(tagData as any);
        });
    })
}


function WikiList(props: IProps) {
    const { filterData }  = props;
    const list = useMemo<ItemModuleType[]>(() => filterList(filterData), [filterData])

    return (
        <Flex className="wiki_list" wrap>
            {
                list.map(item => <WikiItem key={item.id} item={item} />)
            }
            {!list?.length && <Empty/>}
        </Flex>
    )
}
export default WikiList;