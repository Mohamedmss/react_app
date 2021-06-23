import React, { useState } from 'react';

const Card = (props) => {
    return (
        <div style={{ padding: '20' }}>
            <a href={props.url}>
                {props.title} by {props.author}
            </a>
        </div>
    );
};
