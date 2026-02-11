import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie
} from 'recharts';

export const PerformanceChart: React.FC<{ data: any[] }> = ({ data }) => {
    const chartData = data?.map(r => ({
        date: new Date(r.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        rating: r.newRating
    })) || [];

    return (
        <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis
                        dataKey="date"
                        stroke="#666"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#666"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        domain={['dataMin - 100', 'dataMax + 100']}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                        itemStyle={{ color: '#00ff41' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="rating"
                        stroke="#00ff41"
                        strokeWidth={3}
                        dot={{ fill: '#00ff41', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

const COLORS = ['#00ff41', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export const TagsChart: React.FC<{ data: any[] }> = ({ data }) => {
    const chartData = data?.slice(0, 6).map(t => ({
        name: t.tag,
        value: t.solved
    })) || [];

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {chartData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
