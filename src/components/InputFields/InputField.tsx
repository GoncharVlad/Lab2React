import React, { useEffect, useState } from "react";

interface MyInputProps {
    placeholder: string,
    inputType: string,
    maxInputLength: number,
    isNeedClearing: boolean,
    toggleNeedClearing: () => void
}

const InputField: React.FC<MyInputProps> = ({
                                             placeholder,
                                             inputType,
                                             maxInputLength,
                                             isNeedClearing,
                                             toggleNeedClearing
                                         }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (isNeedClearing) {
            setInputValue('');
            toggleNeedClearing();
        }
    }, [isNeedClearing, toggleNeedClearing]);

    return (
        <div
            className={`border-[1px] border-solid rounded-2xl bg-transparent py-0 px-4 h-14 text-lg max-w-[340px] w-full mx-auto mb-4 border-controlsBorderCol ${isActive && 'border-black border-2'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <input
                type={inputType}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsActive(true)}
                onBlur={() => setIsActive(false)}
                maxLength={maxInputLength}
                className="border-0 text-black h-10 w-full text-lg rounded-none normal-case bg-none text-left mt-3 p-0 box-border outline-none"
            />
            <label
                className={`ease-linear relative top-[-38px] cursor-default text-left text-[#757575] transition-all ${isHovered || inputValue ? 'top-[-52px] text-sm' : ''} select-none`}
            >
                {placeholder}
            </label>
        </div>
    );
}

export default InputField;
