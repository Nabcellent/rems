import React from 'react';

export default function ValidationErrors({ errors }) {
    return (
        Object.keys(errors).length > 0 && (
            <div className="mb-4">
                <div className="fw-medium text-danger">Whoops! Something is invalid.🌚</div>

                <ul className="text-sm text-danger">
                    {Object.keys(errors).map(function (key, index) {
                        return <li key={index} className={'small'}>{errors[key]}</li>;
                    })}
                </ul>
            </div>
        )
    );
}
