import React from 'react';
import styled from 'styled-components';
import { FONTWEIGHT } from '../../../constants/fonts';

const cleanPercentage = (percentage) => {
  const tooLow = !Number.isFinite(+percentage) || percentage < 0;
  const tooHigh = percentage > 100;
  return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

const Circle = ({ colour, pct }) => {
  const r = 70;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - pct) * circ) / 100;
  return (
    <circle
      r={r}
      cx={100}
      cy={100}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ''} // remove colour as 0% sets full circumference
      strokeWidth={'2rem'}
      strokeDasharray={circ}
      strokeDashoffset={pct ? strokePct : 0}
      strokeLinecap="round"
    ></circle>
  );
};

const Text = ({ percentage, num, y, header }) => {
  return (
    <Texted
      x="50%"
      y={y}
      dominantBaseline="central"
      textAnchor="middle"
      color="red"
    >
      {percentage.toFixed(0)}% {num} {header}
    </Texted>
  );
};

const CircularProgressBar = ({ percentage, colour, num }) => {
  const pct = cleanPercentage(percentage);
  return (
    <svg width={200} height={200}>
      <g transform={`rotate(-90 ${'100 100'})`}>
        <Circle colour="lightgrey" />
        <Circle colour={colour} pct={pct} />
      </g>
      {/* <Text percentage={pct} num={header} y="60%" /> */}
      <Text percentage={pct} num={num} y="50%" />
    </svg>
  );
};

export default CircularProgressBar;

const Texted = styled.text`
  display: inline-block;
  flex-direction: column;
  font-size: 1.8rem;
  font-weight: ${FONTWEIGHT.bold};
`;
