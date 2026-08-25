import "./WikiCraftItem.css"
import { useEffect, useState } from "react";
import { Card, Popover, Image, Spin } from "antd";
import type { ItemModuleType } from "../assets/datas/Types";
import errorImag from "../assets/images/error.png"

interface IProps {
    item?: ItemModuleType,
}


function WikiCraftItem(props: IProps) {
    const [iconSrc, setIconSrc] = useState<string>();
    const [detailSrc, setDetailSrc] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [isDetailLoading, setIsDetailLoading] = useState<boolean>(true);
    const { item }  = props;

    useEffect(() => {
        if(!item) return
        async function loadImage(item: ItemModuleType){
            const icons = await item.iconModule();
            const details = await item.detailModule();
            setIconSrc(icons);
            setDetailSrc(details)
        }
        loadImage(item);
    }, []);
    if(!item) return null;
    return (
        <Card className="wiki_craft_item" >
            <Popover classNames={{root:"wiki_popover"}} placement="leftTop" destroyOnHidden mouseEnterDelay={0.3} onOpenChange={() => setIsDetailLoading(true)} content={
                    <div className="wiki_detail">
                        { isDetailLoading && <Spin style={{margin:"50px auto"}} /> }
                        <div className="wiki_detail_image" style={{display: isDetailLoading? "none":"block"}}>
                            { <Image style={{width: 400, height:"auto"}} src={detailSrc} alt={item.name} onLoad={() => setIsDetailLoading(false)} fallback={errorImag} /> }
                        </div>
                    </div>
                }>
                <div className="wiki_craft_item_cover">
                    { isLoading && <Spin style={{margin:"50px auto"}} /> }
                    <img loading="lazy"  style={{width: isLoading? 0:"auto", display: isError? "none": "block"}} src={iconSrc} alt={item.name} onLoad={() => setIsLoading(false)} onError={() => {setIsError(true)}} />
                    {isError && <img loading="lazy"  style={{width: isLoading? 0:"100%"}} src={errorImag} alt={item.name} onLoad={() => setIsLoading(false)} onError={() => {setIsLoading(false)}} />}
                </div>
            </Popover>
        </Card>
    )
}
export default WikiCraftItem;
