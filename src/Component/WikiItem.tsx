import { useEffect, useState, type CSSProperties } from "react";
import { Card, Empty, Popover, Image } from "antd";
import { Meta } from "antd/es/list/Item";
import type { ItemDataType } from "../assets/datas/Types";

interface IProps {
    className?: string,
    style?: CSSProperties,
    item?: ItemDataType
}

const iconUrl = "../assets/images/icons/";
const detailUrl = "../assets/images/details/";


function WikiItem(props: IProps) {
    const [iconSrc, setIconSrc] = useState(null);
    const [detailSrc, setDetailSrc] = useState(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { className, style, item }  = props;
    useEffect(() => {
        const loadImage = async () => {
            if(!item) return
            setIsLoading(true);
            const icon = await import(`${iconUrl}${item.sourceName}`);
            const detail = await import(`${detailUrl}${item.sourceName}`);
            setIconSrc(icon.default);
            setDetailSrc(detail.default)
            setIsLoading(false);
        };
        loadImage();
    }, []);
    return (
        item ? 
        <Popover classNames={{root:"wiki_popover"}} mouseEnterDelay={0.3} destroyOnHidden content={detailSrc && !isLoading ? <Image style={{width: 400, height:"auto"}} src={detailSrc} alt={item.name}  /> : <Empty />}>
            <Card className={className} style={style} cover={!iconSrc || isLoading ? <Image placeholder={{ progress: { render: () => 'loading...' } }}  /> : <Image src={iconSrc} alt={item.name} preview={false} />} >
                <Meta title={item.name}></Meta>
            </Card>
        </Popover> : <Empty />
    )
}
export default WikiItem;
