import { Empty, Flex } from "antd";
import { useMemo, type CSSProperties } from "react";
import WikiItem from "./WikiItem";
import type { FilterType, ItemDataKeyType, ItemDataType } from "../assets/datas/Types";
import { itemDatas } from "../assets/datas/ItemDatas";

interface IProps {
    className?: string,
    style?: CSSProperties,
    filterData: FilterType | null
}

function filterList(filterData: FilterType | null){
    // debugger
    if(filterData === null) return itemDatas;
    // 搜索物品
    if(filterData.keyword !== undefined && filterData.keyword.trim() !== "") {
        return itemDatas.filter(item => item.name.includes(filterData.keyword as string));
    }
    // 标签筛选
    const exactKeys = Object.keys(filterData).filter(key => key !=="keyword" && filterData[key as keyof FilterType] != undefined);
    if(!exactKeys.length) return itemDatas;
    return itemDatas.filter((item: ItemDataType) => {
        return exactKeys.every((key) => {
            const curData = item[(key as keyof ItemDataType)];
            const tagData = filterData[(key as keyof FilterType)];
            if(!Array.isArray(curData)) return false;
            return curData.includes(tagData as any);
        });
    })
}


function WikiList(props: IProps) {
    const { className, style, filterData }  = props;

    const list = useMemo<ItemDataType[]>(() => filterList(filterData), [filterData])

    return (
        <Flex className={className} style={style} wrap>
            {
                list?.length ? list.map(item => <WikiItem key={item.id} className="wiki_item" item={item} />) : <Empty/>
            }
        </Flex>
    )
}
export default WikiList;