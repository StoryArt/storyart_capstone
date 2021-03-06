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
    // REPLACEALL: 'REPLACEALL',
    APPEND: 'APPEND',
    PREPEND: 'PREPEND',
    REPLACE: 'REPLACE',
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
            { value: NUMBER_OPERATIONS.PLUS, title: 'Cộng' },
            { value: NUMBER_OPERATIONS.MINUS, title: 'Trừ' },
            { value: NUMBER_OPERATIONS.MULTIPLY, title: 'Nhân' },
            { value: NUMBER_OPERATIONS.DIVIDE, title: 'Chia' },
            { value: NUMBER_OPERATIONS.REPLACE, title: 'Thay giá trị mới' },
        ]
    },
    {
        type: INFORMATION_TYPES.STRING,
        conditions: [
            STRING_CONDITIONS.EQUAL
        ],
        operations: [
            { value: STRING_OPERATIONS.REPLACE, title: 'Thay giá trị mới' },
            { value: STRING_OPERATIONS.APPEND, title: 'Thêm chữ vào sau' },
            { value: STRING_OPERATIONS.PREPEND, title: 'Thêm chữ vào trước' },
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

export const ORDER_BYS = {
    AVG_RATE: 'avg_rate',
    READ: 'read',
    COMEMENT: 'comment',
    SCREEN: 'screen',
    RATING: 'rating',
    DATE: 'date',
    CENSORSHIP_REQUEST_TIME: 'censorship_request_time',
}

export const SCREEN_COLORS = {
    FIRST_SCREEN: '#009688',
    ENDING_SCREEN: '#f44336',
    NORMAL_SCREEN: '#e1bee7'
}

export const getOrderBys = () => {
    const { AVG_RATE, READ, COMEMENT, SCREEN, RATING, DATE, CENSORSHIP_REQUEST_TIME } = ORDER_BYS;
    return [
        { value: AVG_RATE, title: 'Đánh giá trung bình' },
        { value: READ, title: 'Lượt đọc' },
        { value: COMEMENT, title: 'Lượt bình luận' },
        // { value: SCREEN, title: 'Số màn hình' },
        { value: RATING, title: 'Lượt đánh giá' },
        { value: DATE, title: 'Ngày tạo' },
        { value: CENSORSHIP_REQUEST_TIME, title: 'Thời gian đề nghị kiểm duyệt' },
        
    ]
}


export const CENSORSHIP_STATUS = {
    APPROVED: "APPROVED",
    PENDING: "PENDING",
    REJECTED: "REJECTED",
}

export const getCensorshipStatus = () => {
    return [
        { value: CENSORSHIP_STATUS.APPROVED, title: 'Chấp thuận kiểm duyệt', text: 'Kiểm duyệt OK!'},
        { value: CENSORSHIP_STATUS.PENDING, title: 'Xem xét kiểm duyệt' },
        { value: CENSORSHIP_STATUS.REJECTED, title: 'Từ chối kiểm duyệt', text: 'Nội dung không phù hợp, cần chỉnh sửa lại!' },
    ]
}

export const getCensorshipTitle = (value) => {
    const arr = getCensorshipStatus();
    const found = arr.find(item => item.value === value);
    return found != null ? found.title : '';
}

export const ADMIN_ACCESS_ERRORS = 'Quản trị viên không thể thực hiện tính năng của người dùng!';