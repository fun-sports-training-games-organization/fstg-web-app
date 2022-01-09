import * as React from 'react';
import { Stack } from '@mui/material';
import ResponsiveContainer from '../../templates/containers/responsive-container/ResponsiveContainer';
import ExerciseCard from '../../templates/cards/exercise-card/ExerciseCard';
import WorkoutCard from '../../templates/cards/workout-card/WorkoutCard';
import ProfileCard from '../../templates/cards/profile-card/ProfileCard';
import { useCallback } from 'react';
import update from 'immutability-helper';
import useStickyState from '../../../hooks/useStickyState';

const Dashboard = (): JSX.Element => {
    const [cards, setCards] = useStickyState<Array<{ id: number; text: string }>>(
        [
            { id: 1, text: 'profile' },
            { id: 2, text: 'workout' },
            { id: 3, text: 'exercise' }
        ],
        'fstg.dashboard.order'
    );

    const moveCard = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            const dragCard = cards[dragIndex];
            setCards(
                update(cards, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragCard]
                    ]
                })
            );
        },
        [cards, setCards]
    );

    const renderCard = (card: { id: number; text: string }, index: number) => {
        switch (card.text) {
            case 'profile':
                return <ProfileCard key={card.id} index={index} id={card.id} moveCard={moveCard} />;
            case 'workout':
                return <WorkoutCard key={card.id} index={index} id={card.id} moveCard={moveCard} />;
            case 'exercise':
                return <ExerciseCard key={card.id} index={index} id={card.id} moveCard={moveCard} />;
        }
    };

    return (
        <ResponsiveContainer>
            <Stack spacing={2} padding={2}>
                {cards.map((card, i) => renderCard(card, i))}
            </Stack>
        </ResponsiveContainer>
    );
};

export default Dashboard;
