import React from 'react';

import { Card } from './context';

import bankImage from './bank.png';

export function Home(){
    return (
        <Card
            txtcolor="black"
            title="Welcome to the bank"
            text="For all your banking needs"
            body={(<img src={ bankImage } className="img-fluid" alt="Responsive image"/>)}
        />
    );
}
