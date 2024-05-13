import React from "react";

interface IncrementButtonProps {
    value: number;
    handleIncrement: (value: number) => void;
}

const IncrementButton: React.FC<IncrementButtonProps> = ({ value, handleIncrement }) => (
    <div
        tabIndex={0}
        className="py-2 px-4 bg-white border rounded-2xl border-controlsBorderCol cursor-pointer select-none min-h-[40px] flex items-center justify-center hover:bg-gray-200"
        onClick={() => handleIncrement(value)}
    >
        <div className="text-lg font-normal leading-6">
            +{value}&nbsp;₴
        </div>
    </div>
);

export default IncrementButton;
