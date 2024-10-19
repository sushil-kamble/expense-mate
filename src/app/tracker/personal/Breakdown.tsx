'use client';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { PersonalExpenseBreakdown } from '@/lib/types';
import { useState } from 'react';
import NumbersBreakdown from './NumbersBreakdown';
import ChartBreakdown from './ChartBreakdown';
import { motion, AnimatePresence } from 'framer-motion';

type ViewMode = 'number' | 'chart';

const Breakdown = ({ breakdown }: { breakdown: PersonalExpenseBreakdown }) => {
    const [viewMode, setViewMode] = useState<ViewMode>('number');

    const handleViewModeChange = (value: ViewMode) => {
        if (value && value !== viewMode) setViewMode(value);
    };

    return (
        <div>
            <ToggleGroup
                type="single"
                value={viewMode}
                onValueChange={handleViewModeChange}
            >
                <ToggleGroupItem value="number">Numbers</ToggleGroupItem>
                <ToggleGroupItem value="chart">Chart</ToggleGroupItem>
            </ToggleGroup>

            <div className="mt-4">
                <AnimatePresence mode="wait">
                    {viewMode === 'number' ? (
                        <motion.div
                            key="numbers"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <NumbersBreakdown breakdown={breakdown} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chart"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChartBreakdown breakdown={breakdown} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Breakdown;
