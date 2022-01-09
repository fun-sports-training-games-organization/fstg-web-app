import * as React from 'react';
import { FC, PropsWithChildren, useRef } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { DashboardCardProps } from './DashboardCard.types';
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';

export const ItemTypes = {
    CARD: 'card'
};

interface DragItem {
    index: number;
    id: string;
    type: string;
}

const DashboardCard: FC<PropsWithChildren<DashboardCardProps>> = ({
    cardProps,
    cardHeaderProps,
    cardMediaProps,
    cardContentProps,
    cardActionsProps,
    children,
    id,
    index,
    moveCard
}: PropsWithChildren<DashboardCardProps>) => {
    const ref = useRef<HTMLDivElement>(null);
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            };
        },
        hover(item: DragItem, monitor: DropTargetMonitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        }
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id, index };
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging()
        })
    });

    const opacity = isDragging ? 0.2 : 1;
    drag(drop(ref));
    return (
        <Card style={{ opacity }} ref={ref} data-handler-id={handlerId} {...cardProps}>
            {cardHeaderProps && <CardHeader {...cardHeaderProps} />}
            {cardMediaProps && <CardMedia {...cardMediaProps} />}
            <CardContent {...cardContentProps}>{children}</CardContent>
            {cardActionsProps && <CardActions {...cardActionsProps}></CardActions>}
        </Card>
    );
};

export default DashboardCard;
