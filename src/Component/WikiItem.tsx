import { useEffect, useState, type CSSProperties } from "react";
import { Card, Empty, Popover, Image, Tooltip } from "antd";
import type { BiomeIconType, ItemModuleType } from "../assets/datas/Types";

interface IProps {
    className?: string,
    style?: CSSProperties,
    item?: ItemModuleType,
}


function WikiItem(props: IProps) {
    const [iconSrc, setIconSrc] = useState<string>();
    const [detailSrc, setDetailSrc] = useState<string>();
    const [biomes, setBiomes] = useState<BiomeIconType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { className, style, item }  = props;

    useEffect(() => {
        if(!item) return
        async function loadImage(item: ItemModuleType){
            setIsLoading(true);
            const icons = await item.iconModule();
            const details = await item.detailModule();
            const biomes = await Promise.all(item.biomeModules.map(async biome => ({...biome, url: await biome.module()})));
            setIconSrc(icons);
            setIsLoading(false);
            setDetailSrc(details)
            setBiomes(biomes);
        }
        loadImage(item);
    }, []);

    return (
        item ? 
            <Card className={className} style={style} >
                <div className="wiki_item_container">
                    <Popover classNames={{root:"wiki_popover"}} mouseEnterDelay={0.3} content={detailSrc && !isLoading ? <Image loading="lazy" style={{width: 400, height:"auto"}} src={detailSrc} alt={item.name}  /> : <Empty />}>
                        <div className="wiki_item_cover">
                            {
                                !iconSrc || isLoading ? <Image loading="lazy" placeholder={{ progress: { render: () => 'loading...' } }}  /> : <img loading="lazy" src={iconSrc} alt={item.name}  />
                            }
                        </div>
                    </Popover>
                    <div className="wiki_item_name">{item.name}</div>
                    <div className="wiki_item_biome">
                        {
                            biomes.map(biome => <Tooltip  key={biome.sourceName} placement="bottom" title={biome.name}><img loading="lazy" src={biome.url} /></Tooltip>)
                        }
                    </div>
                </div>
            </Card>
            : <Empty />
        )
}
export default WikiItem;
