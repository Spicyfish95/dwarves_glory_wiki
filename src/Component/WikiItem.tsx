import { useEffect, useState, type CSSProperties } from "react";
import { Card, Empty, Popover, Image, Tooltip } from "antd";
import type { BiomeIconType, ItemDataType } from "../assets/datas/Types";
import { BiomeIconData } from "../assets/datas/ItemDatas";

interface IProps {
    className?: string,
    style?: CSSProperties,
    item?: ItemDataType
}

const iconUrl = "/images/icons/";
const detailUrl = "/images/details/";
const biomelUrl = "/images/biomes/";


function WikiItem(props: IProps) {
    const [iconSrc, setIconSrc] = useState<string>();
    const [detailSrc, setDetailSrc] = useState<string>();
    const [biomes, setBiomes] = useState<BiomeIconType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { className, style, item }  = props;

    useEffect(() => {
        if(!item) return

        setIsLoading(true);

        setIconSrc(`${import.meta.env.BASE_URL}${iconUrl}${item.sourceName}`);
        setDetailSrc(`${import.meta.env.BASE_URL}${detailUrl}${item.sourceName}`);

        const biomeDatas = item.biomeType.map(type => {
            const data = BiomeIconData[type];
            return {
                ...data,
                url: `${import.meta.env.BASE_URL}${biomelUrl}${data.sourceName}`
            };
        });

        if(biomeDatas.length) {
            setBiomes(biomeDatas);
        }

        setIsLoading(false);
    }, [item]);

    return (
        item ? 
            <Card className={className} style={style} >
                <div className="wiki_item_container">
                <Popover classNames={{root:"wiki_popover"}} mouseEnterDelay={0.3} destroyOnHidden content={detailSrc && !isLoading ? <Image style={{width: 400, height:"auto"}} src={detailSrc} alt={item.name}  /> : <Empty />}>
                    <div className="wiki_item_cover">
                        {
                            !iconSrc || isLoading ? <Image placeholder={{ progress: { render: () => 'loading...' } }}  /> : <Image src={iconSrc} alt={item.name} preview={false} />
                        }
                    </div>
                </Popover>
                    <div className="wiki_item_name">{item.name}</div>
                    <div className="wiki_item_biome">
                        {
                            biomes.map(biome => <Tooltip  key={biome.sourceName} placement="bottom" title={biome.name}><img src={biome.url} /></Tooltip>)
                        }
                    </div>
                </div>
            </Card>
            : <Empty />
        )
}
export default WikiItem;
