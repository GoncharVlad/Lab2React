import React, { useEffect, useState } from "react";

interface CreditCardInputProps {
    placeholder: string;
    toggleCardNum: () => void;
    needClearing: boolean;
}

const PaymentCardInput: React.FC<CreditCardInputProps> = ({
                                                             placeholder,
                                                             toggleCardNum,
                                                             needClearing
                                                         }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value: string = event.target.value;
        value = value.replace(/\D/g, '');


        value = value.replace(/(\d{4})/g, '$1 ').trim();

        setInputValue(value);
    };

    useEffect(() => {
        if (inputValue.length === 19)
            toggleCardNum();
    }, [inputValue, toggleCardNum]);

    useEffect(() => {
        if (needClearing)
            setInputValue('');
    }, [needClearing]);

    const containerClasses: string = `border-[1px] border-solid rounded-2xl bg-transparent py-0 px-4 h-14 text-lg max-w-[340px] w-full mx-auto mb-4 border-controlsBorderCol ${
        inputValue || isHovered ? 'border-black border-2' : ''
    }`;
    const labelClasses: string = `transition-all ease-linear relative top-[-38px] cursor-default text-left text-[#757575] ${
        isHovered || inputValue ? 'top-[-52px] text-sm' : ''
    } select-none`;

    return (
        <div
            className={containerClasses}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <input
                type="tel"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setIsHovered(true)}
                onBlur={() => setIsHovered(false)}
                inputMode="decimal"
                pattern="\d*"
                autoComplete="cc-number"
                maxLength={19}
                className="w-full rounded-none text-lg mt-3 p-0 outline-none normal-case bg-none text-left border-0 text-black h-10 box-border"
            />

            <label
                className={labelClasses}
            >
                {placeholder}
            </label>
        </div>
    );
}

export default PaymentCardInput;
