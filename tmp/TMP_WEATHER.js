const weather = `
        <div class="weather-widget">
            <ul></ul>
            <a href="#" class="set-weather">날씨설정</a>            
        </div>
`;
const items = (className, temperatuer, area) => {
    return `
        <li class="items">
            <div class="motion weather_${className}">
                <span class="m1"></span>
                <span class="m2"></span>
            </div>
            <div class="temperatuer">${temperatuer}</div>
            <div class="area">${area}</div>
        </li>
    `
}

export {
    items,
    weather
};