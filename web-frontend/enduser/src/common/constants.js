export const INFORMATION_TYPES = {
    STRING: 'STRING',
    NUMBER: 'NUMBER'
}

export const ACTION_TYPES = {
    REDIRECT: 'REDIRECT',
    NEXT_SCREEN: 'NEXT_SCREEN',
    UPDATE_INFORMATION: 'UPDATE_INFORMATION'
}

export const STRING_CONDITIONS = {
    EQUAL: '=',
}

export const NUMBER_CONDITIONS = {
    EQUAL: '=',
    GREATER: '>',
    LESS: '<',
    LESS_OR_EQUAL: '<=',
    GREATER_OR_EQUAL: '>=',
}

export const NUMBER_OPERATIONS = {
    PLUS: '+',
    MINUS: '-',
    MULTIPLY: '*',
    DIVIDE: '/',
    REPLACE: 'REPLACE'
}

export const STRING_OPERATIONS = {
    REPLACE: 'REPLACE'
}

export const ROLE_NAMES = {
    ROLE_USER: 'ROLE_USER',
    ROLE_ADMIN: 'ROLE_ADMIN',
    ROLE_SYSTEM_ADMIN: 'ROLE_SYSTEM_ADMIN',
}

export const ANIMATIONS = {
    FADE: 'FADE',
    GROW: 'GROW',
    SLIDE: 'SLIDE',
    ZOOM: 'ZOOM',
    COLLAPSE: 'COLLAPSE',
}

export const getAnimations = () => {
    return [
        ANIMATIONS.FADE, ANIMATIONS.GROW, ANIMATIONS.SLIDE, ANIMATIONS.COLLAPSE, ANIMATIONS.ZOOM
    ]
}

export const getParameters = () => {
    return [{
        type: INFORMATION_TYPES.NUMBER,
        conditions: [
            NUMBER_CONDITIONS.EQUAL,
            NUMBER_CONDITIONS.GREATER,
            NUMBER_CONDITIONS.GREATER_OR_EQUAL,
            NUMBER_CONDITIONS.LESS,
            NUMBER_CONDITIONS.LESS_OR_EQUAL,
        ],
        operations: [
            NUMBER_OPERATIONS.PLUS,
            NUMBER_OPERATIONS.MINUS,
            NUMBER_OPERATIONS.MULTIPLY,
            NUMBER_OPERATIONS.DIVIDE,
            NUMBER_OPERATIONS.REPLACE,
        ]
    },
    {
        type: INFORMATION_TYPES.STRING,
        conditions: [
            STRING_CONDITIONS.EQUAL
        ],
        operations: [
            STRING_OPERATIONS.REPLACE
        ]
    }];
}

export const getActions = () => {
    return [
        ACTION_TYPES.NEXT_SCREEN, 
        ACTION_TYPES.REDIRECT,
        ACTION_TYPES.UPDATE_INFORMATION
    ]
}