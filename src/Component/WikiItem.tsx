import { useEffect, useState, type CSSProperties } from "react";
import { Card, Empty, Popover, Image, Tooltip } from "antd";
import { Meta } from "antd/es/list/Item";
import type { BiomeIconType, ItemDataType } from "../assets/datas/Types";
import { BiomeIconData } from "../assets/datas/ItemDatas";

interface IProps {
    className?: string,
    style?: CSSProperties,
    item?: ItemDataType
}

const iconUrl = "../assets/images/icons/";
const detailUrl = "../assets/images/details/";
const biomelUrl = "../assets/images/biomes/";


function WikiItem(props: IProps) {
    const [iconSrc, setIconSrc] = useState(null);
    const [detailSrc, setDetailSrc] = useState(null);
    const [biomes, setBiomes] = useState<BiomeIconType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { className, style, item }  = props;
    useEffect(() => {
        const loadImage = async () => {
            if(!item) return
            setIsLoading(true);
            const icon = await import(`${iconUrl}${item.sourceName}`);
            setIconSrc(icon.default);
            setIsLoading(false);
            const detail = await import(`${detailUrl}${item.sourceName}`);
            setDetailSrc(detail.default);
            const biomeDatas: BiomeIconType[] = [];
            for (let i = 0; i<item.biomeType.length; i++) {
                const data = BiomeIconData[item.biomeType[i]];
                const res = await import(`${biomelUrl}${data.sourceName}`);
                biomeDatas.push({...data, url: res.default});
            }
            if(biomeDatas.length) {
                setBiomes(biomeDatas);
            }
        };
        loadImage();
    }, []);
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
