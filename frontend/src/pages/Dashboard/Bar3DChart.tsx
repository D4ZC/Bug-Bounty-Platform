import React from 'react';
import ReactECharts from 'echarts-for-react';

interface Bar3DChartProps {
  data: Array<{ name: string; value: number }>;
  title: string;
  colorList?: string[];
}

const Bar3DChart: React.FC<Bar3DChartProps> = ({ data, title, colorList }) => {
  const option = {
    title: {
      text: title,
      left: 'center',
      textStyle: {
        color: '#00fff7',
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: 24,
      },
    },
    tooltip: {
      show: true,
      formatter: (params: any) =>
        `<div style='color:#00fff7;font-weight:bold;'>${params.name}</div><div style='color:#fff;'>Puntos: <b>${params.value[1]}</b></div>`
    },
    xAxis3D: {
      type: 'category',
      data: data.map(d => d.name),
      axisLabel: { color: '#00fff7', fontFamily: 'monospace', fontWeight: 'bold', fontSize: 16 },
      axisLine: { lineStyle: { color: '#00fff7' } },
    },
    yAxis3D: {
      type: 'value',
      axisLabel: { color: '#00fff7', fontFamily: 'monospace', fontWeight: 'bold', fontSize: 16 },
      axisLine: { lineStyle: { color: '#00fff7' } },
    },
    zAxis3D: { type: 'category', data: [''], show: false },
    grid3D: {
      boxWidth: 120,
      boxDepth: 40,
      viewControl: { projection: 'perspective', autoRotate: true, autoRotateSpeed: 20 },
      light: { main: { intensity: 1.2, shadow: true }, ambient: { intensity: 0.3 } },
      environment: '#181c2b',
    },
    series: [
      {
        type: 'bar3D',
        data: data.map((d, i) => [d.name, d.value, '']),
        shading: 'color',
        label: {
          show: true,
          position: 'top',
          color: '#fff',
          fontWeight: 'bold',
          fontFamily: 'monospace',
        },
        itemStyle: {
          color: (params: any) => colorList ? colorList[params.dataIndex % colorList.length] : '#00fff7',
          opacity: 0.95,
        },
        emphasis: {
          itemStyle: {
            color: '#39ff14',
            opacity: 1,
          },
        },
        animation: true,
        animationDuration: 1200,
        animationEasing: 'cubicOut',
      },
    ],
  };

  return (
    <div style={{ width: '100%', height: 320 }}>
      {React.createElement(ReactECharts as any, { option, style: { width: '100%', height: 320 } })}
    </div>
  );
};

export default Bar3DChart; 