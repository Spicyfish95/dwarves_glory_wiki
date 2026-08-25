import { useEffect, useState, type CSSProperties } from "react";
import { Card, Empty, Popover, Image, Tooltip, Spin } from "antd";
import type { BiomeIconType, ItemModuleType } from "../assets/datas/Types";
import errorImag from "../assets/images/error.png"

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
    const [isError, setIsError] = useState<boolean>(false);
    const [isDetailLoading, setIsDetailLoading] = useState<boolean>(true);
    const { className, style, item }  = props;

    useEffect(() => {
        if(!item) return
        async function loadImage(item: ItemModuleType){
            const icons = await item.iconModule();
            const details = await item.detailModule();
            const biomes = await Promise.all(item.biomeModules.map(async biome => ({...biome, url: await biome.module()})));
            setIconSrc(icons);
            setDetailSrc(details)
            setBiomes(biomes);
        }
        loadImage(item);
    }, []);

    return (
        item ? 
            <Card className={className} style={style} >
                <div className="wiki_item_container">
                    <Popover classNames={{root:"wiki_popover"}} placement="bottomLeft" destroyOnHidden mouseEnterDelay={0.3} onOpenChange={() => setIsDetailLoading(true)} content={
                            <div className="wiki_detail">
                                { isDetailLoading && <Spin style={{margin:"50px auto"}} /> }
                                <div className="wiki_detail_image" style={{display: isDetailLoading? "none":"block"}}>
                                    { <Image style={{width: 400, height:"auto"}} src={detailSrc} alt={item.name} onLoad={() => setIsDetailLoading(false)} fallback={errorImag} /> }
                                </div>
                            </div>
                        }>
                        <div className="wiki_item_cover">
                            { isLoading && <Spin style={{margin:"50px auto"}} /> }
                            <img loading="lazy"  style={{width: isLoading? 0:"auto", display: isError? "none": "block"}} src={iconSrc} alt={item.name} onLoad={() => setIsLoading(false)} onError={() => {setIsError(true)}} />
                            {isError && <img loading="lazy"  style={{width: isLoading? 0:"100%"}} src={errorImag} alt={item.name} onLoad={() => setIsLoading(false)} onError={() => {setIsLoading(false)}} />}
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
