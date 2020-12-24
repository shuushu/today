const TMP_PROGRESS = `
<svg id="newsEdgeProgress" class="newsEdgeProgress">
    <g class="progress">
        <defs><linearGradient id="pathLinear"><stop offset="0%" stop-color="#639eff"></stop><stop offset="100%" stop-color="rgba(91, 108, 255, .98)"></stop></linearGradient></defs>
        <path class="pathBackboard" d="M 0 20 H 0 V 28M 4 20 H 4 V 28M 8 20 H 8 V 28M 12 20 H 12 V 28M 16 20 H 16 V 28M 20 20 H 20 V 28M 24 20 H 24 V 28M 28 20 H 28 V 28M 32 20 H 32 V 28M 36 20 H 36 V 28M 40 20 H 40 V 28M 44 20 H 44 V 28M 48 20 H 48 V 28M 52 20 H 52 V 28M 56 20 H 56 V 28M 60 20 H 60 V 28M 64 20 H 64 V 28M 68 20 H 68 V 28M 72 20 H 72 V 28M 76 20 H 76 V 28M 80 20 H 80 V 28M 84 20 H 84 V 28M 88 20 H 88 V 28M 92 20 H 92 V 28M 96 20 H 96 V 28M 100 20 H 100 V 28M 104 20 H 104 V 28M 108 20 H 108 V 28M 112 20 H 112 V 28M 116 20 H 116 V 28M 120 20 H 120 V 28M 124 20 H 124 V 28M 128 20 H 128 V 28M 132 20 H 132 V 28M 136 20 H 136 V 28M 140 20 H 140 V 28M 144 20 H 144 V 28M 148 20 H 148 V 28M 152 20 H 152 V 28M 156 20 H 156 V 28M 160 20 H 160 V 28M 164 20 H 164 V 28M 168 20 H 168 V 28M 172 20 H 172 V 28M 176 20 H 176 V 28M 180 20 H 180 V 28M 184 20 H 184 V 28M 188 20 H 188 V 28M 192 20 H 192 V 28M 196 20 H 196 V 28M 200 20 H 200 V 28M 204 20 H 204 V 28M 208 20 H 208 V 28M 212 20 H 212 V 28M 216 20 H 216 V 28M 220 20 H 220 V 28M 224 20 H 224 V 28M 228 20 H 228 V 28M 232 20 H 232 V 28M 236 20 H 236 V 28M 240 20 H 240 V 28M 244 20 H 244 V 28M 248 20 H 248 V 28M 252 20 H 252 V 28" stroke-width="1" stroke="#c7ccd1" fill="none" shape-rendering="crispEdges"></path>
        <path class="pathBack" d="M0 24 l 0 0" stroke-linecap="round" stroke-width="10" stroke="#e6e8ea"></path>
        <path class="pathFront" stroke="url(#pathLinear)" d="M0 24 l 254 0.01" stroke-width="14" stroke-linecap="round" fill="#5b6cff"></path>
        <g class="timeGroup" transform="matrix(1,0,0,1,0,24)">
            <circle class="timeKnob" r="12" stroke="#5b6cff" stroke-width="1" fill="#fff"></circle>
            <rect class="timeKnobEmpty" x="-24" y="-24" width="48" height="48" fill="transparent"></rect>
            <svg class="timeTooltip" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="91.44" height="40" viebox="0,0,91.44,40" style="overflow: visible">
              <defs>
                <filter id="filter1Back" width="128.9%" height="167.4%" x="-14.4%" y="-28.5%" filterUnits="objectBoundingBox">
                    <feOffset result="shadowOffsetOuter1" in="SourceAlpha" dy="2"></feOffset>
                    <feGaussianBlur result="shadowBlurOuter1" in="shadowOffsetOuter1" stdDeviation="4"></feGaussianBlur>
                    <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix>
                    <rect id="filter1Rect" width="91.44" height="40" x="-45.72" y="-64"></rect>
                </filter>
                <filter id="filter2Back" width="356.7%" height="367.1%" x="-128.3%" y="-85%" filterUnits="objectBoundingBox">
                    <feOffset result="shadowOffsetOuter1" in="SourceAlpha" dy="4"></feOffset>
                    <feGaussianBlur result="shadowBlurOuter1" in="shadowOffsetOuter1" stdDeviation="3"></feGaussianBlur>
                    <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0754206731 0"></feColorMatrix>
                    <path id="filter2Path" transform="translate(-14 -24)" d="M 19.285 0 L 15 8.235 10.714 0 h 8.571z"></path>
                </filter>
              </defs>
              <g>
                  <use fill="#000" filter="url(#filter1Back)" xlink:href="#filter1Rect"></use>
                  <use fill="#fff" xlink:href="#filter1Rect"></use>
                  <use fill="#000" filter="url(#filter2Back)" xlink:href="#filter2Path"></use>
                  <use fill="#fff" xlink:href="#filter2Path"></use>
                  <text class="timeText" alignment-baseline="middle" text-anchor="middle" x="0" y="-38" font-size="22.352px">
                      <tspan class="hh" dx="0" dy=".1em" fill="#000">00</tspan><tspan class="dtm-div" dx="4" dy="-.1em" fill="#7c8aff">:</tspan><tspan class="mm" dx="5" dy=".1em" fill="#000">00</tspan>
                  </text>
              </g>
          </svg>
        </g>
    </g>
</svg>
`;

export {
    TMP_PROGRESS,
};